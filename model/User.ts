export class User {
    private username: string;
    private password: string;
    private email: string;
    private isSeller: boolean;

    constructor(username: string, password: string, email: string, isSeller: boolean
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isSeller = isSeller;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public getEmail(): string {
        return this.email;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getIsSeller(): boolean {
        return this.isSeller;
    }

    public setIsSeller(isSeller: boolean): void {
        this.isSeller = isSeller;
    }
}