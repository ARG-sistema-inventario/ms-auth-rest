import { IsNotEmpty, IsString } from "class-validator";

export default class CreateCategoryRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}