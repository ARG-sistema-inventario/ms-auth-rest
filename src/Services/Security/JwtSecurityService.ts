import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import RoleConstants from 'src/Constants/RoleConstants';
import Payload from 'src/Models/Auth/Payload';

@Injectable()
export default class JwtSecurityService {
    constructor(private readonly _jwtService: JwtService) { }

    async generateAccessToken(id: number, rol: number): Promise<string> {
        try {
            const payload = { id: id, r: rol };
            const tokenExpiration = rol == RoleConstants.ROL_ADMIN ? '8h' : '15m';
            return this._jwtService.sign(payload, {
                expiresIn: tokenExpiration,
                privateKey: process.env.JWT_SECRET_KEY_SHA256,
            });
        } catch (error) {
            console.log('JWT AccessToken creation error');
            return null;
        }
    }

    async generateRefreshToken(id: number, rol: number): Promise<string> {
        try {
            const payload = { id: id, r: rol };
            return this._jwtService.sign(payload, {
                privateKey: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
                expiresIn: '1w',
            });
        } catch (error) {
            console.log('JWT RefreshToken creation error');
            return null;
        }
    }

    async verifyRefreshToken(token: string): Promise<Payload> {
        return this._jwtService.verify(token.split(' ')[1], { secret: process.env.JWT_SECRET_KEY_REFRESH_TOKEN });
    }
}