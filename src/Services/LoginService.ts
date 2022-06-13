import { Injectable } from "@nestjs/common";
import { UserDao } from "src/Daos/UserDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import UtilityFunctions from "src/Helpers/Utilities/UtilityFunctions";
import { UserEntity } from "src/Models/Entities/UserEntity";
import LoginRequest from "src/Models/Request/LoginController/LoginRequest";
import LoginResponse from "src/Models/Response/LoginController/LoginResponse";
import JwtSecurityService from "./Security/JwtSecurityService";

@Injectable()
export class LoginService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _jwtService: JwtSecurityService
    ) { }

    async login(data: LoginRequest): Promise<LoginResponse> {
        const user: UserEntity = await this._userDao.getUserByEmail(data.email);
        if (!user || !(await UtilityFunctions.getEncryptCompare(data.password, user.getPassword()))) {
            throw new HttpCustomException(`The username or password is invalid`, StatusCodeEnums.INVALID_PASSWORD_USERNAME);
        }
        const accessToken = await this._jwtService.generateAccessToken(user.getId(), user.getRol().getId());
        const refreshToken = await this._jwtService.generateRefreshToken(user.getId(), user.getRol().getId());
        user.setRefreshToken(refreshToken);
        await this._userDao.save(user);
        return new LoginResponse(accessToken, refreshToken);
    }
}