import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDao } from "src/Daos/UserDao";
import Payload from "src/Models/Auth/Payload";
import { UserEntity } from "src/Models/Entities/UserEntity";
import AuthResponse from "src/Models/Response/AuthController/AuthResponse";
import JwtSecurityService from "./Security/JwtSecurityService";

@Injectable()
export class AuthService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _jwtService: JwtSecurityService
    ) { }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        let payload: Payload;
        try {
            payload = await this._jwtService.verifyRefreshToken(refreshToken);
        } catch (error) {
            console.log(`Error verifyRefreshToken: name: ${error.name}, message: ${error.message}`)
            throw new UnauthorizedException(`Invalid refresh token: ${error.name}. Authentication Required`);
        }
        const user: UserEntity = await this._userDao.getUserById(payload.id);
        if (!user || !user.getRefreshToken() || refreshToken.split(' ')[1] != user.getRefreshToken()) {
            throw new UnauthorizedException(`Invalid refresh token. Authentication Required`);
        }
        const accessToken: string = await this._jwtService.generateAccessToken(payload.id, user.getRol().getId());
        return new AuthResponse({ accessToken, refreshToken })
    }
}