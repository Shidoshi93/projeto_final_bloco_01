import { questionInt } from "readline-sync";

const menuOptions: string[] = [
    "Login",
    "Register",
    "Buy Item",
    "Sell Item",
    "View Profile",
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
        break;
    case 2:
        console.log("You selected Register.");
        break;
    case 3:
        console.log("You selected Buy Item.");
        break;
    case 4:
        console.log("You selected Sell Item.");
        break;
    case 5:
        console.log("You selected View Profile.");
        break;
    case 6:
        console.log("You selected Logout.");
        break;
    default:
        console.log("Invalid selection.");
        break;
}

console.log(`You selected option ${userChoice}: ${menuOptions[userChoice - 1]}`);