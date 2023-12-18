import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/Models/Entities/CategoryEntity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryDao {
    constructor(@InjectRepository(CategoryEntity) private readonly _categoryRepository: Repository<CategoryEntity>) { }

    async getAll(userId: number): Promise<CategoryEntity[]> {
        const query = this._categoryRepository.createQueryBuilder("category")
            .where("category.userId = :userId", { userId: userId })
            .getMany();
        return await query;
    }

    async getCategoryByName(name: string, userId: number): Promise<CategoryEntity> {
        const query = this._categoryRepository.createQueryBuilder("category")
            .where("category.name = :name", { name: name })
            .andWhere("category.userId = :userId", { userId: userId })
            .getOne();
        return await query;
    }

    async getCategoryById(id: number, userId: number): Promise<CategoryEntity> {
        const query = this._categoryRepository.createQueryBuilder("category")
            .where("category.id = :id", { id: id })
            .andWhere("category.userId = :userId", { userId: userId })
            .getOne();
        return await query;
    }

    async update(id: number, category: CategoryEntity): Promise<any> {
        const query = this._categoryRepository.createQueryBuilder("category")
            .update(CategoryEntity)
            .set({
                name: category.name,
                description: category.description,
                enable: category.enable
            })
            .where("id = :id", { id: id })
            .execute();
        return await query;
    }

    async deleteById(id: number): Promise<any> {
        const query = this._categoryRepository.createQueryBuilder("category")
            .delete()
            .where({ id: id })
            .execute();
        return await query;
    }

    async create(category: CategoryEntity): Promise<CategoryEntity> {
        return await this._categoryRepository.save(category);
    }
}