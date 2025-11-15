import { question, questionInt, questionFloat, keyInSelect } from "readline-sync";
import { EletricBike } from "../model/EletricBike";

export const eletricBikeForm = (userId: number) => {
    console.log("Register a New Electric Bike");

    const name: string = question("Enter bike name: ");
    const description: string = question("Enter bike description: ");
    const price: number = questionFloat("Enter bike price: ");
    const quantity: number = questionInt("Enter bike quantity: ");

    const batteryCapacity: number = questionInt("Enter battery capacity (in Wh): ");
    const rangePerCharge: number = questionInt("Enter range per charge (in km): ");

    const newElectricBike: EletricBike = new EletricBike(
        name,
        description,
        price,
        quantity,
        "electric",
        userId,
        batteryCapacity,
        rangePerCharge
    );

    console.log("Electric bike registered successfully!");
    return newElectricBike;
}