import { Bike } from "./BIke";

export class MoutainBike extends Bike {
    private suspensionType: string;
    private frameMaterial: string;

    constructor(
        name: string,
        description: string,
        price: number,
        quantity: number,
        type: string,
        ownerUserId: number,
        suspensionType: string,
        frameMaterial: string
    ) {
        super(name, description, price, quantity, type, ownerUserId);
        this.suspensionType = suspensionType;
        this.frameMaterial = frameMaterial;
    }

    public getSuspensionType(): string {
        return this.suspensionType;
    }

    public getFrameMaterial(): string {
        return this.frameMaterial;
    }

    public getDetails(): string {
        return `Moutain Bike: ${this.getName()},\n Description: ${this.getDescription()},\n Price: $${this.getPrice().toFixed(2)},\n Quantity: ${this.getQuantity()},\n Type: ${this.getType()},\n Suspension Type: ${this.suspensionType},\n Frame Material: ${this.frameMaterial},\n id: ${this.getId()},\n ownerUserId: ${this.getUserId()}`;
    }
}