export default class EmailMessage {
    public to: string[];
    public subject: string;
    public text: string;
    public html: string;
    public from: string;

    constructor(to: string[], subject: string, html: string, from: string = null, text: string = null) {
        this.setTo(to);
        this.setSubject(subject);
        this.setHtml(html);
        this.setText(text);
        this.setFrom(from);
    }

    public getTo(): string[] {
        return this.to;
    }

    public setTo(to: string[]): void {
        this.to = to;
    }

    public getSubject(): string {
        return this.subject;
    }

    public setSubject(subject: string): void {
        this.subject = subject;
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }

    public getHtml(): string {
        return this.html;
    }

    public setHtml(html: string): void {
        this.html = html;
    }

    public getFrom(): string {
        return this.from;
    }

    public setFrom(from: string): void {
        this.from = from;
    }
}