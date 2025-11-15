import { question, questionInt, questionFloat, keyInSelect } from "readline-sync";
import { ProductInput } from "../types/Product";
import { Bike } from "../model/BIke";
import { moutainBikeForm } from "./MoutainBikeForm";
import { roadBikeForm } from "./RoadBikeForm";
import { eletricBikeForm } from "./EletricBikeForm";
import { SessionManager } from "../util/SessionManager";

export class ProductRegistrationForm {
    public static registerProduct(type: string): Bike {
        const userId = SessionManager.getCurrentUserId();
        if (userId === null) {
            console.log("No user is currently logged in.");
            throw new Error("User not logged in");
        }
        
        if (type === "mountain") {
            return moutainBikeForm(userId);
        } else if (type === "road") {
            return roadBikeForm(userId);
        } else if (type === "electric") {
            return eletricBikeForm(userId);
        } else {
            console.log("Invalid bike type selected.");
            throw new Error("Invalid bike type");
        }
        
    }
}