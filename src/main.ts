import helmet from 'helmet';
import { AppModule } from './AppModule';
import * as BodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.use(helmet());

    app.use(BodyParser.json({ limit: '50mb' }))
    app.use(BodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.setGlobalPrefix('ms-auth-api');
    app.enableCors();
    await app.listen(configService.get<string>('PORT'));
}
bootstrap();
