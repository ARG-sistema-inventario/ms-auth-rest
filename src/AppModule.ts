import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { envFilePathConfiguration } from "./Configs/EnvFilePathConfig";
import { nestEnvConfiguration } from "./Configs/NestEnvConfig";
import { DBConfigInterface } from "./Configs/DbConfigInterface";
import { ApplicationModule } from "./Modules/ApplicationModule";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [envFilePathConfiguration()],
            load: [nestEnvConfiguration],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                Object.assign(configService.get<DBConfigInterface>('DATABASE')),
        }),
        ApplicationModule
    ],
    providers: [],
})
export class AppModule { }