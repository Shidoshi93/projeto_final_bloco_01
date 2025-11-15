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
        userId: number,
        gearCount: number,
        frameMaterial: string
    ) {
        super(name, description, price, quantity, type, userId);
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
        return `Moutain Bike: ${this.getName()},\n Description: ${this.getDescription()},\n Price: $${this.getPrice().toFixed(2)},\n Quantity: ${this.getQuantity()},\n Type: ${this.getType()},\n Suspension Type: ${this.gearCount},\n Frame Material: ${this.frameMaterial}`;
    }
}