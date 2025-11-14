import { question } from "readline-sync";

export interface User {
    username: string;
    password: string;
    email: string;
    id?: number;
}

export function registerUser(): User {
    console.log("User Registration");

    const username: string = question("Enter username: ");
    const password: string = question("Enter password: ");
    const email: string = question("Enter email: ");

    const newUser: User = {
        username,
        password,
        email,
        id: Date.now() // Simple unique ID based on timestamp
    };

    console.log("User registered successfully!");
    return newUser;
}