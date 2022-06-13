import { IsBoolean, IsOptional, IsString } from "class-validator";

export default class UpdateCategoryRequest {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;

}