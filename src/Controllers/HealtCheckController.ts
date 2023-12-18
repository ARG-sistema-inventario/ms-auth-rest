import { Controller, Get } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";

@Controller('health-check')
export class HealtCheckController {
    @Get()
    async healthCheck(): Promise<Response<Object>> {
        return Response.create<Object>({})
    }
}