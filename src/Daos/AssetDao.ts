import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssetEntity } from "src/Models/Entities/AssetsEntity";
import { Repository } from "typeorm";

@Injectable()
export class AssetDao {
    constructor(@InjectRepository(AssetEntity) private readonly _assetRepository: Repository<AssetEntity>) { }

    async create(data: AssetEntity): Promise<any> {
        return await this._assetRepository.save(data);
    }

    async getAll(userId: number): Promise<AssetEntity[]> {
        const query = this._assetRepository.createQueryBuilder("assets")
            .where("assets.userId = :userId", { userId: userId })
            .getMany();
        return await query;
    }

    async findByName(name: string): Promise<AssetEntity> {
        const query = this._assetRepository.createQueryBuilder('asset')
            .where('asset.name = :name', { name: name })
            .getOne();
        return await query;
    }

    async getAssetById(id: number, userId: number): Promise<AssetEntity> {
        const query = this._assetRepository.createQueryBuilder('asset')
            .where('asset.id = :id', { id: id })
            .andWhere('asset.userId = :userId', { userId: userId })
            .getOne();
        return await query;
    }

    async deleteById(id: number): Promise<any> {
        const query = this._assetRepository.createQueryBuilder("asset")
            .delete()
            .where({ id: id })
            .execute();
        return await query;
    }
}