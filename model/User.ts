import { Endereco } from "./Endereco";

export class User {
    private username: string;
    private password: string;
    private email: string;
    private isSeller: boolean;
    private id: number;
    private endereco: Endereco | undefined;

    constructor(username: string, password: string, email: string, isSeller: boolean, endereco?: Endereco
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isSeller = isSeller;
        this.id = Date.now();
        this.endereco = endereco;
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

    public getEndereco(): Endereco | undefined {
        return this.endereco;
    }

    public setEndereco(endereco: Endereco): void {
        this.endereco = endereco;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
}