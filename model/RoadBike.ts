import { Bike } from "./BIke";

export class RoadBike extends Bike {
    private frameMaterial: string;
    private gearCount: number;

    constructor(
        name: string,
        description: string,
        price: number,
        quantity: number,
        type: string,
        ownerUserId: number,
        gearCount: number,
        frameMaterial: string
    ) {
        super(name, description, price, quantity, type, ownerUserId);
        this.gearCount = gearCount;
        this.frameMaterial = frameMaterial;
    }

    public getgearCoun(): number {
        return this.gearCount;
    }

    public getFrameMaterial(): string {
        return this.frameMaterial;
    }

    public getDetails(): string {
        return `Road Bike: ${this.getName()},\n Description: ${this.getDescription()},\n Price: $${this.getPrice().toFixed(2)},\n Quantity: ${this.getQuantity()},\n Type: ${this.getType()},\n Gear Count: ${this.gearCount},\n Frame Material: ${this.frameMaterial},\n id: ${this.getId()},\n ownerUserId: ${this.getUserId()}`;
    }
}