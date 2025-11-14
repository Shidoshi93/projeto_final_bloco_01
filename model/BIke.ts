import User from "../types/UserTypes";

export abstract class Bike {
    private name: string;
    private description: string;
    private price: number;
    private quantity: number;
    private type: string;
    private user: User | undefined;

    constructor(name: string, description: string, price: number, quantity: number, type: string, user?: User) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
        this.user = user;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPrice(): number {
        return this.price;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getUser(): User | undefined {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public abstract getDetails(): string;
}