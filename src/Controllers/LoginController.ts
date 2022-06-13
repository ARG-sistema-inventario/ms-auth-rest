import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";
import LoginRequest from "src/Models/Request/LoginController/LoginRequest";
import LoginResponse from "src/Models/Response/LoginController/LoginResponse";
import { LoginService } from "src/Services/LoginService";

@Controller('login')
export class LoginController {
    constructor(private readonly _loginService: LoginService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Body() data: LoginRequest): Promise<Response<LoginResponse>> {
        const response = await this._loginService.login(data);
        return Response.create<LoginResponse>(response);
    }
}