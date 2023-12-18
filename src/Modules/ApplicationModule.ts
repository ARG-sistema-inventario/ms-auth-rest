import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';
import { RabbitMQConfig, RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { importAllFromRequireContext } from "src/Helpers/Utilities/RequireContext";

@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                Object.assign(configService.get<RabbitMQConfig>('RABBITMQ'))
        }),
        TypeOrmModule.forFeature(importAllFromRequireContext(require.context('../Models/Entities', true, /Entity\.ts$/))),
        JwtModule.register({}),
    ],
    providers: [
        ...importAllFromRequireContext(require.context('../Daos', true, /\.ts$/)),
        ...importAllFromRequireContext(require.context('../Services', true, /\.ts$/)),
        ...importAllFromRequireContext(require.context('../WebServices/', true, /\.ts$/)),
    ],
    controllers: importAllFromRequireContext(require.context('../Controllers', true, /\.ts$/)),
    exports: [TypeOrmModule],
})
export class ApplicationModule { }