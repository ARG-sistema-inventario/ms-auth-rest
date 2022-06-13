export default class TemplateParameters {
    private email: string;

    private url: string;

    private user: any;

    private context: any;

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getUrl(): string {
        return this.url;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public getUser(): any {
        return this.user;
    }

    public setUser(user: any): void {
        this.user = user;
    }

    public getContext(): any {
        return this.context;
    }

    public setContext(context: any): void {
        this.context = context;
    }

}