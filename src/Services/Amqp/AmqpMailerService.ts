import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import EmailMessage from "src/Models/Messages/EmailMessage";
import { AmqpConnectionService } from "./AmqpConnectionService";

@Injectable()
export class AmqpMailerService {
    private readonly TOPIC_KEY = this._configService.get<string>('MQ_EMAIL_NOTIFICATION_TOPIC_KEY');
    private readonly RETRY = this._configService.get<string>('MQ_EMAIL_NOTIFICATION_RETRY');

    constructor(
        private readonly _amqpConnectionService: AmqpConnectionService,
        private readonly _configService: ConfigService,
    ) { }

    async notify(data: EmailMessage): Promise<void> {
        const retry: number | null = this.RETRY ? Number(this.RETRY) : null;
        try {
            return await this._amqpConnectionService.publish<EmailMessage>(data, this.TOPIC_KEY, null, retry);
        } catch (error) {
            console.log(error);
        }
    }
}