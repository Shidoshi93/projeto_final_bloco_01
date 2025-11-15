import { question, } from "readline-sync";
import { User } from "../model/User";

export class UserRegistrationForm {
    public static registerUser(): User | null {
        console.log("User Registration");

        const username: string = question("Enter username: ");
        if (!username || username.trim() === "") {
            console.log("Username is required.");
            return null;
        }

        const password: string = question("Enter password: ", {
            hideEchoBack: true
        });
        if (!password || password.trim() === "") {
            console.log("Password is required.");
            return null;
        }

        const email: string = question("Enter email: ");
        if (!email || email.trim() === "") {
            console.log("Email is required.");
            return null;
        }

        const newUser: User = new User(username.trim(), password.trim(), email.trim(), false);

        return newUser;
    }
}