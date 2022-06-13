import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import UpdateCategoryRequest from "src/Models/Request/CategoryController/UpdateCategoryRequest";
import CategoryResponse from "src/Models/Response/CategoryController/CategoryResponse";
import CreateCategoryResponse from "src/Models/Response/CategoryController/CreateCategoryResponse";
import { CategoryService } from "src/Services/CategoryService";

@Controller('category')
export class CategoryController {
    constructor(private readonly _categoryService: CategoryService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(
        @HeaderRequired('si-access-token') token: string
    ): Promise<Response<CategoryResponse[]>> {
        const response = await this._categoryService.getAll(token);
        return Response.create<CategoryResponse[]>(response);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() data: UpdateCategoryRequest,
        @HeaderRequired('si-access-token') token: string
    ): Promise<Response<CreateCategoryResponse>> {
        const response = await this._categoryService.create(data, token);
        return Response.create<CreateCategoryResponse>(response);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: number,
        @Body() data: UpdateCategoryRequest,
        @HeaderRequired('si-access-token') token: string
    ): Promise<Response<boolean>> {
        const response = await this._categoryService.update(id, data, token);
        return Response.create<boolean>(response);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(
        @Param('id') id: number,
        @HeaderRequired('si-access-token') token: string
    ): Promise<Response<boolean>> {
        const response = await this._categoryService.delete(id, token);
        return Response.create<boolean>(response);
    }
}