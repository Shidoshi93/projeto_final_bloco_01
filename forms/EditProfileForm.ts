import { question } from "readline-sync";
import { User } from "../model/User";

export class EditProfileForm {
    public static editProfile(): User {
        console.log("Edit User Profile Form");

        const username: string = question("Enter new username: ");
        const password: string = question("Enter new password: ");
        const email: string = question("Enter new email: ");

        const updatedUser: User = new User(username, password, email, false);

        return updatedUser;
    }
}