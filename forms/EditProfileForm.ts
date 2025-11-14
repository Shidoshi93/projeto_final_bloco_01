import { question } from "readline-sync";

export interface User {
    username: string;
    password: string;
    email: string;
}

export function editProfile(): User {
    console.log("Edit User Profile Form");

    const username: string = question("Enter new username: ");
    const password: string = question("Enter new password: ");
    const email: string = question("Enter new email: ");

    const updatedUser: User = {
        username,
        password,
        email
    };

    console.log("Profile updated successfully!");
    return updatedUser;
}