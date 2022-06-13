import { BadRequestException, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { RolDao } from "src/Daos/RolDao";
import { UserDao } from "src/Daos/UserDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import UtilityFunctions from "src/Helpers/Utilities/UtilityFunctions";
import { Rol } from "src/Models/Entities/RolEntity";
import { UserEntity } from "src/Models/Entities/UserEntity";
import CreateUserRequest from "src/Models/Request/UserController/CreateUserRequest";
import { CreateUserResponse } from "src/Models/Response/UserController/CreateUserResponse";
import { EmailService } from "./EmailService";

@Injectable()
export class UserService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _rolDao: RolDao,
        private readonly _emailService: EmailService
    ) { }

    async create(data: CreateUserRequest): Promise<CreateUserResponse> {
        const rol: Rol = await this._rolDao.getRolById(2);
        if (!rol) throw new BadRequestException('Invalid rol id');
        await this.checkPasswordFormat(data.password);
        const user: UserEntity = await this._userDao.getUserByEmail(data.email);
        if (user) throw new HttpCustomException(`This username or email is already taken`, StatusCodeEnums.EMAIL_DUPLICATED);
        let newUser: UserEntity = new UserEntity();
        newUser.setEmailToVerificate(data.email);
        newUser.setPassword(await UtilityFunctions.getEncryptData(data.password));
        newUser.setRol(rol);
        newUser.setVerificationCode(await UtilityFunctions.getValidationCode());
        newUser.setUuid(uuidv4());
        newUser.setName(data.name);
        newUser.setLastName(data.lastName);
        newUser = await this._userDao.save(newUser);
        await this._emailService.sendEmail(newUser, 'TestSimple', 'hola', 'tetete');
        return new CreateUserResponse(newUser.getUuid());
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

    private async checkPasswordFormat(password: string): Promise<void> {
        const isPasswordValid = await UtilityFunctions.isPasswordValid(password);
        if (!isPasswordValid) {
            throw new HttpCustomException(`Password dont meet the requirements`, StatusCodeEnums.INVALID_FORMAT_PASSWORD);
        }
    }
}