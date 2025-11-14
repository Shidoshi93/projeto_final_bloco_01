import { question } from "readline-sync";

export interface LoginCredentials {
    username: string;
    password: string;
}

export function loginUser(): LoginCredentials {
    console.log("User Login");

    const username: string = question("Enter username: ");
    const password: string = question("Enter password: ");

    const credentials: LoginCredentials = {
        username,
        password
    };

    // call the controller function to handle user login here

    console.log("Login successful!");
    return credentials;
}