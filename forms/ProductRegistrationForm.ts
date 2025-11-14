import { question, questionInt, questionFloat } from "readline-sync";

export interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export function registerProduct(): Product {
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

    console.log("Product registered successfully!");
    return newProduct;
}

// Example usage
const product = registerProduct();
console.log("Registered Product:", product);