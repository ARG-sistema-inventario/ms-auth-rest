import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/Models/Entities/UserEntity";
import { Repository } from "typeorm";

@Injectable()
export class UserDao {
    constructor(@InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>) { }

    async save(data: UserEntity): Promise<UserEntity> {
        return await this._userRepository.save(data);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user: UserEntity = await this._userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.rol', 'rol')
            .where('user.email = :email', { email: email })
            .andWhere('user.active = true')
            .getOne();
        return user;
    }

    async getUserById(id: number): Promise<UserEntity> {
        const user: UserEntity = await this._userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.rol', 'rol')
            .where('user.id = :id', { id: id })
            .andWhere('user.active = 1')
            .getOne();

        return user;
    }

    async update(data: any): Promise<any> {
        return {
            message: "User created successfully"
        };
    }

    async delete(data: any): Promise<any> {
        return {
            message: "User created successfully"
        };
    }
}