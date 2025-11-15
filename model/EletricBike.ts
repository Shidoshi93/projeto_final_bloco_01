import { Bike } from "./BIke";

export class EletricBike extends Bike {
    private batteryCapacity: number;
    private rangePerCharge: number;

    constructor(
        name: string,
        description: string,
        price: number,
        quantity: number,
        type: string,
        userId: number,
        batteryCapacity: number,
        rangePerCharge: number
    ) {
        super(name, description, price, quantity, type, userId);
        this.batteryCapacity = batteryCapacity;
        this.rangePerCharge = rangePerCharge;
    }

    public getBatteryCapacity(): number {
        return this.batteryCapacity;
    }

    public getRangePerCharge(): number {
        return this.rangePerCharge;
    }

    public getDetails(): string {
        return `Eletric Bike: ${this.getName()},\n Description: ${this.getDescription()},\n Price: $${this.getPrice().toFixed(2)},\n Quantity: ${this.getQuantity()},\n Type: ${this.getType()},\n Battery Capacity: ${this.batteryCapacity}Wh,\n Range per Charge: ${this.rangePerCharge}km`;
    }
}