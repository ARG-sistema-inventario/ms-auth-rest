export default class AuthResponse {
    accessToken: string;
    refreshToken: string;

    constructor(auth: AuthResponse) {
        this.accessToken = auth.accessToken;
        this.refreshToken = auth.refreshToken;
    }
}