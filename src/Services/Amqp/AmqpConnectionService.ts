import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Options } from 'amqplib';
import RabbitMessageRequest from 'src/Models/Request/RabbitMessageRequest';

@Injectable()
export class AmqpConnectionService {
    private readonly EXCHANGE_CONNECTION = this._configService.get<string>('RABBITMQ_EXCHANGE');

    constructor(private readonly _amqpConnection: AmqpConnection, private readonly _configService: ConfigService) { }

    async publish<T>(
        data: T,
        type: string,
        key: string,
        options: Options.Publish = null,
        retryOption: number | null = 0,
        exchange: string = this.EXCHANGE_CONNECTION,
    ): Promise<void> {
        const retry: number | null = retryOption;
        const message: RabbitMessageRequest<T> = RabbitMessageRequest.create<T>(data, type, retry);
        await this._amqpConnection.publish(exchange, key, message, options);
    }
}