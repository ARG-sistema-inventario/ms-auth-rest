import Handlebars from 'handlebars';
import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/Models/Entities/UserEntity";
import Message from '../Models/Messages/EmailMessage';
import * as fs from 'fs';
import { AmqpMailerService } from './Amqp/AmqpMailerService';
import TemplateParameters from 'src/Models/Template/TemplateParameters';

@Injectable()
export class EmailService {
    constructor(private readonly _amqpMailerService: AmqpMailerService) { }

    async sendEmail(patient: UserEntity, template: string, link: string = null, emailFrom?: string): Promise<void> {
        const parameters: TemplateParameters = this.buildBaseTemplateParameters(patient, link);
        const message = await this.getMessage(
            parameters.getEmail(),
            template,
            parameters,
            'email.patient.subject',
            { patient: patient.getEmail() },
            emailFrom,
        );
        await this._amqpMailerService.notify(message);
    }

    public async getMessage(
        email: string,
        template: string,
        templateParams: any = [],
        subjectKey: string,
        subjectParams: any = [],
        from: string = null,
    ): Promise<Message> {
        const parameters = templateParams;
        if (subjectParams) {
            subjectKey = await this.setSubjectParams(subjectKey, subjectParams);
        }
        const body = await this.render(template, parameters);
        return new Message([email], subjectKey, body, from);
    }

    private async setSubjectParams(subject: string, subjectParams: any): Promise<string> {
        for (const key in subjectParams) {
            if (subject.includes(`@${key}`)) {
                subject = subject.replace(`@${key}`, subjectParams[key]);
            }
        }
        return subject;
    }

    private async render(template: string, parameters: any): Promise<string> {
        const source = fs.readFileSync(`${process.cwd()}/templates/${template}.hbs`).toString();
        const tmp = Handlebars.compile(source);
        return tmp(parameters);
    }

    private buildBaseTemplateParameters(user: UserEntity, link: string = null): TemplateParameters {
        const parameters: TemplateParameters = new TemplateParameters();
        const email: string = user.getEmail();
        parameters.setEmail(email);
        parameters.setUser(user);
        parameters.setUrl(link)
        return parameters;
    }
}