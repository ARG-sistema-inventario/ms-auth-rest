import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import AuthResponse from "src/Models/Response/AuthController/AuthResponse";
import { AuthService } from "src/Services/AuthService";

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(
        @HeaderRequired('si-access-token') refreshToken: string
    ): Promise<Response<AuthResponse>> {
        const response = await this._authService.refreshToken(refreshToken);
        return Response.create<AuthResponse>(response);
    }
}