import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import CreateAssetRequest from "src/Models/Request/AssetController/CreateAssetRequest";
import { AssetService } from "src/Services/AssetService";

@Controller('assets')
export class AssetController {
    constructor(private readonly _assetService: AssetService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(
        @HeaderRequired('si-access-token') token: string
    ): Promise<Response<any>> {
        const response = await this._assetService.getAll(token);
        return Response.create<any>(response);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(
        @Body() data: CreateAssetRequest,
        @HeaderRequired('si-access-token') token: string
    ): Promise<Response<boolean>> {
        const response = await this._assetService.create(data, token);
        return Response.create<boolean>(response);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(
        @Param('id') id: number,
        @HeaderRequired('si-access-token') token: string
    ): Promise<Response<boolean>> {
        const response = await this._assetService.delete(id, token);
        return Response.create<boolean>(response);
    }

}