import { question, questionInt, questionFloat, keyInSelect } from "readline-sync";
import { ProductInput } from "../types/Product";

export class ProductRegistrationForm {
    public static registerProduct(): ProductInput {
        console.log("Register a New Product");

        const name: string = question("Enter product name: ");
        const description: string = question("Enter product description: ");
        const price: number = questionFloat("Enter product price: ");
        const quantity: number = questionInt("Enter product quantity: ");
        const userId: number = questionInt("Enter user ID: ");

        const newProduct: ProductInput = {
            name,
            description,
            price,
            quantity,
            userId
        };

        console.log("Product registered successfully!");
        return newProduct;
    }
}