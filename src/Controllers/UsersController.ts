import { Body, Controller, Post } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";
import CreateUserRequest from "src/Models/Request/UserController/CreateUserRequest";
import { CreateUserResponse } from "src/Models/Response/UserController/CreateUserResponse";
import { UserService } from "src/Services/UserService";

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Post()
    async create(@Body() data: CreateUserRequest): Promise<Response<CreateUserResponse>> {
        const response = await this._userService.create(data);
        return Response.create<CreateUserResponse>(response);
    }
}