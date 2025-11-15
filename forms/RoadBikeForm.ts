import { question, questionInt, questionFloat, keyInSelect } from "readline-sync";
import { RoadBike } from "../model/RoadBike";

export const roadBikeForm = (userId: number) => {
    console.log("Register a New Road Bike");

    const name: string = question("Enter bike name: ");
    const description: string = question("Enter bike description: ");
    const price: number = questionFloat("Enter bike price: ");
    const quantity: number = questionInt("Enter bike quantity: ");
    const frameMaterialIndex = keyInSelect(["aluminum", "carbon"], "Select frame material: ");
    const frameMaterial: string = frameMaterialIndex !== -1 ? ["aluminum", "carbon"][frameMaterialIndex]! : "aluminum";
    const gearCountIndex = keyInSelect(["10", "11", "12"], "Select gear count: ");
    const gearCount: number = gearCountIndex !== -1 ? parseInt(["10", "11", "12"][gearCountIndex]!) : 10;

    const newRoadBike: RoadBike = new RoadBike(
        name,
        description,
        price,
        quantity,
        "road",
        userId,
        gearCount,
        frameMaterial
    );

    console.log("Road bike registered successfully!");
    return newRoadBike;
}