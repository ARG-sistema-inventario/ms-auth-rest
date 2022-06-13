import { Injectable } from "@nestjs/common";
import { AssetDao } from "src/Daos/AssetDao";
import { CategoryDao } from "src/Daos/CategoryDao";
import { UserDao } from "src/Daos/UserDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { AssetEntity } from "src/Models/Entities/AssetsEntity";
import { CategoryEntity } from "src/Models/Entities/CategoryEntity";
import { UserEntity } from "src/Models/Entities/UserEntity";
import CreateAssetRequest from "src/Models/Request/AssetController/CreateAssetRequest";
import AssetResponse from "src/Models/Response/AssetController/AssetResponse";
import JwtSecurityService from "./Security/JwtSecurityService";

@Injectable()
export class AssetService {
    constructor(
        private readonly _assetDao: AssetDao,
        private readonly _userDao: UserDao,
        private readonly _categoryDao: CategoryDao,
        private readonly _jwtService: JwtSecurityService
    ) { }

    async getAll(token: string): Promise<AssetResponse[]> {
        const userId = await this._jwtService.verifyRefreshToken(token);
        const user: UserEntity = await this._userDao.getUserById(userId.id);
        if (!user) throw new HttpCustomException(`User not found`, StatusCodeEnums.USER_NOT_FOUND);
        let response: Array<AssetResponse> = [];
        const assets: AssetEntity[] = await this._assetDao.getAll(user.getId());
        response = assets.map((asset: AssetEntity) => {
            return new AssetResponse(asset);
        });
        return response;
    }

    async create(data: CreateAssetRequest, token: string): Promise<boolean> {
        const userId = await this._jwtService.verifyRefreshToken(token);
        const user: UserEntity = await this._userDao.getUserById(userId.id);
        if (!user) throw new HttpCustomException(`User not found`, StatusCodeEnums.USER_NOT_FOUND);
        const findCategory: CategoryEntity = await this._categoryDao.getCategoryById(data.categoryId, user.getId());
        if (!findCategory) throw new HttpCustomException(`Category not found`, StatusCodeEnums.CATEGORY_NOT_FOUND);
        const findAsset: AssetEntity = await this._assetDao.findByName(data.name);
        if (findAsset) throw new HttpCustomException(`Asset already exists`, StatusCodeEnums.ASSET_ALREADY_EXISTS);
        let newAsset = new AssetEntity();
        newAsset.setUserId(user.getId());
        newAsset.setName(data.name);
        newAsset.setDescription(data.description);
        newAsset.setStock(data.stock);
        newAsset.setStockAmount(data.stockAmount);
        newAsset.setPrice(data.price);
        newAsset.setCategoryId(findCategory.getId());
        newAsset.setEnable(true);
        await this._assetDao.create(newAsset);
        return true;
    }

    async delete(id: number, token: string): Promise<boolean> {
        const userId = await this._jwtService.verifyRefreshToken(token);
        const user: UserEntity = await this._userDao.getUserById(userId.id);
        if (!user) throw new HttpCustomException(`User not found`, StatusCodeEnums.USER_NOT_FOUND);
        const asset: AssetEntity = await this._assetDao.getAssetById(id, user.getId());
        if (!asset) throw new HttpCustomException(`Asset not found`, StatusCodeEnums.ASSET_NOT_FOUND);
        await this._assetDao.deleteById(id);
        return true;
    }

}