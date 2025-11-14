import { questionInt } from "readline-sync";
import { registerProduct } from "./forms/ProductRegistrationForm";
import { loginUser } from "./forms/LoginForm";
import { registerUser } from "./forms/UserRegistrationForm";
import { editProfile } from "./forms/EditProfileForm";
import { buyItem } from "./forms/BuyItemForm";

const menuOptions: string[] = [
    "Login",
    "Register",
    "Buy Item",
    "Sell Item",
    "Edit Profile",
    "Logout"
];

export function displayMenu(options: string[]): number {
    console.log("Please choose an option:");
    options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });

    let choice: number;
    while (true) {
        choice = questionInt("Enter the number of your choice: ");
        if (choice >= 1 && choice <= options.length) {
            break;
        }
        console.log("Invalid choice. Please try again.");
    }

    return choice;
}

const userChoice = displayMenu(menuOptions);

switch (userChoice) {
    case 1:
        console.log("You selected Login.");

        loginUser();
        break;
    case 2:
        console.log("You selected Register.");

        registerUser();
        break;
    case 3:
        console.log("You selected Buy Item.");

        buyItem();
        break;
    case 4:
        console.log("You selected Sell Item.");

        registerProduct();
        break;
    case 5:
        console.log("You selected Edit Profile.");

        editProfile();
        break;
    case 6:
        console.log("You selected Logout.");

        // call the controller function to handle user logout here
        break;
    default:
        console.log("Invalid selection.");
        break;
}

console.log(`You selected option ${userChoice}: ${menuOptions[userChoice - 1]}`);