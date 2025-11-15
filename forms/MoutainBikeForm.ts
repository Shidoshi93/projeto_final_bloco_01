import { question, questionInt, questionFloat, keyInSelect } from "readline-sync";
import { MoutainBike } from "../model/MoutainBike";

export const moutainBikeForm = (userId: number) => {
    console.log("Register a New Mountain Bike");

    const name: string = question("Enter bike name: ");
    const description: string = question("Enter bike description: ");
    const price: number = questionFloat("Enter bike price: ");
    const quantity: number = questionInt("Enter bike quantity: ");
    const suspensionTypeIndex = keyInSelect(["front", "full"], "Select suspension type: ");
    const suspensionType: string = suspensionTypeIndex !== -1 ? ["front", "full"][suspensionTypeIndex]! : "front";
    const frameMaterialIndex = keyInSelect(["aluminum", "carbon"], "Select frame material: ");
    const frameMaterial: string = frameMaterialIndex !== -1 ? ["aluminum", "carbon"][frameMaterialIndex]! : "aluminum";

    const newMoutainBike: MoutainBike = new MoutainBike(
        name,
        description,
        price,
        quantity,
        "mountain",
        userId,
        suspensionType,
        frameMaterial
    );

    console.log("Mountain bike registered successfully!");
    return newMoutainBike;
}