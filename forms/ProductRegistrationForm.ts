import { question, questionInt, questionFloat } from "readline-sync";

export interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export class ProductRegistrationForm {
    public registerProduct(): Product {
        console.log("Register a New Product");

        const name: string = question("Enter product name: ");
        const description: string = question("Enter product description: ");
        const price: number = questionFloat("Enter product price: ");
        const quantity: number = questionInt("Enter product quantity: ");

        const newProduct: Product = {
            name,
            description,
            price,
            quantity
        };

        // call the controller function to handle product registration here

        console.log("Product registered successfully!");
        return newProduct;
    }
}