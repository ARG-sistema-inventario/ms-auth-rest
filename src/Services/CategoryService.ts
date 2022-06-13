import { Injectable } from "@nestjs/common";
import { CategoryDao } from "src/Daos/CategoryDao";
import { UserDao } from "src/Daos/UserDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { CategoryEntity } from "src/Models/Entities/CategoryEntity";
import { UserEntity } from "src/Models/Entities/UserEntity";
import CreateCategoryRequest from "src/Models/Request/CategoryController/CreateCategoryRequest";
import UpdateCategoryRequest from "src/Models/Request/CategoryController/UpdateCategoryRequest";
import CategoryResponse from "src/Models/Response/CategoryController/CategoryResponse";
import CreateCategoryResponse from "src/Models/Response/CategoryController/CreateCategoryResponse";
import JwtSecurityService from "./Security/JwtSecurityService";

@Injectable()
export class CategoryService {
    constructor(
        private readonly _categoryDao: CategoryDao,
        private readonly _userDao: UserDao,
        private readonly _jwtService: JwtSecurityService
    ) { }

    async getAll(token: string): Promise<CategoryResponse[]> {
        const userId = await this._jwtService.verifyRefreshToken(token);
        const user: UserEntity = await this._userDao.getUserById(userId.id);
        let response: Array<CategoryResponse> = [];
        const categories = await this._categoryDao.getAll(user.getId());
        response = categories.map((category: CategoryEntity) => {
            return new CategoryResponse(
                category.getId(), category.getName(), category.getDescription(), category.isEnable()
            );
        });
        return response;
    }

    async create(data: CreateCategoryRequest, token: string): Promise<CreateCategoryResponse> {
        const userId = await this._jwtService.verifyRefreshToken(token);
        const user: UserEntity = await this._userDao.getUserById(userId.id);
        if (!user) throw new HttpCustomException(`User not found`, StatusCodeEnums.USER_NOT_FOUND);
        const findCategory: CategoryEntity = await this._categoryDao.getCategoryByName(data.name, userId.id);
        if (findCategory) throw new HttpCustomException(`Category already exists`, StatusCodeEnums.CATEGORY_ALREADY_EXISTS);
        let newCategory: CategoryEntity = new CategoryEntity();
        newCategory.setName(data.name);
        newCategory.setDescription(data.description);
        newCategory.setEnable(true);
        newCategory.setUserId(user.getId());
        await this._categoryDao.create(newCategory);
        return new CreateCategoryResponse(newCategory.getId(), newCategory.getName());
    }

    async update(id: number, data: UpdateCategoryRequest, token: string): Promise<boolean> {
        const userId = await this._jwtService.verifyRefreshToken(token);
        const user: UserEntity = await this._userDao.getUserById(userId.id);
        if (!user) throw new HttpCustomException(`User not found`, StatusCodeEnums.USER_NOT_FOUND);
        const category: CategoryEntity = await this._categoryDao.getCategoryById(id, userId.id);
        if (!category) throw new HttpCustomException(`Category not found`, StatusCodeEnums.CATEGORY_NOT_FOUND);
        let updateCategory = new CategoryEntity();
        if (data.name) updateCategory.setName(data.name);
        if (data.description) updateCategory.setDescription(data.description);
        if (data.status == false) updateCategory.setEnable(data.status);
        if (data.status == true) updateCategory.setEnable(data.status);
        await this._categoryDao.update(category.getId(), updateCategory);
        return true;
    }

    async delete(id: number, token: string): Promise<boolean> {
        const userId = await this._jwtService.verifyRefreshToken(token);
        const user: UserEntity = await this._userDao.getUserById(userId.id);
        if (!user) throw new HttpCustomException(`User not found`, StatusCodeEnums.USER_NOT_FOUND);
        const category: CategoryEntity = await this._categoryDao.getCategoryById(id, userId.id);
        if (!category) throw new HttpCustomException(`Category not found`, StatusCodeEnums.CATEGORY_NOT_FOUND);
        try {
            await this._categoryDao.deleteById(category.getId());
            return true;
        } catch (error) {
            throw new HttpCustomException(`This category is not empty`, StatusCodeEnums.CATEGORY_NOT_EMPTY);
        }
    }
}