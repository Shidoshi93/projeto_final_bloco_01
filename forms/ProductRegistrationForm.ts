import { Bike } from "../model/BIke";
import { moutainBikeForm } from "./MoutainBikeForm";
import { roadBikeForm } from "./RoadBikeForm";
import { eletricBikeForm } from "./EletricBikeForm";
import { SessionManager } from "../util/SessionManager";
import { bikeTypes } from "../util/ProductsMock";


export class ProductRegistrationForm {
    public static registerProduct(type: string): Bike {
        const userId = SessionManager.getCurrentUserId();
        if (userId === null) {
            console.log("No user is currently logged in.");
            throw new Error("User not logged in");
        }
        
        const validTypes = Object.values(bikeTypes) as string[];
        if (!validTypes.includes(type)) {
            console.log(`Invalid bike type selected. Valid types: ${validTypes.join(", ")}`);
            throw new Error("Invalid bike type");
        }
        
        switch (type) {
            case "mountain":
                return moutainBikeForm(userId);
            case "road":
                return roadBikeForm(userId);
            case "electric":
                return eletricBikeForm(userId);
            default:
                throw new Error("Invalid bike type");
        }
    }
}