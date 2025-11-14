import { MenuDisplay } from "./MenuDisplay";
import { MenuHandlers } from "./MenuHandlers";
import { SessionManager } from "../util/SessionManager";

export class Menu {
    public static handleMenuChoice(choice: number): boolean {
        switch (choice) {
            case 1:
                console.log("You selected Login.");
                if (!SessionManager.isUserLoggedIn()) {
                    MenuHandlers.handleLogin();
                } else {
                    console.log("You are already logged in!");
                }
                break;
            case 2:
                console.log("You selected Register.");
                MenuHandlers.handleUserRegistration();
                break;
            case 3:
                console.log("You selected List Products.");
                MenuHandlers.listAllProducts();
                break;
            case 4:
                console.log("You selected Buy Item.");
                if (SessionManager.requireLogin()) {
                    MenuHandlers.handlePurchase();
                }
                break;
            case 5:
                console.log("You selected Sell Item.");
                if (SessionManager.requireLogin()) {
                    MenuHandlers.handleSellItem();
                }
                break;
            case 6:
                console.log("You selected Purchase History.");
                if (SessionManager.requireLogin()) {
                    MenuHandlers.handlePurchaseHistory();
                }
                break;
            case 7:
                console.log("You selected Edit Profile.");
                if (SessionManager.requireLogin()) {
                    MenuHandlers.handleEditProfile();
                }
                break;
            case 8:
                console.log("You selected Logout.");
                if (SessionManager.isUserLoggedIn()) {
                    SessionManager.logout();
                    console.log("Logged out successfully!");
                } else {
                    console.log("You are not logged in.");
                }
                break;
            case 9:
                console.log("You selected Exit Application.");
                console.log("Thank you for using our system! Goodbye!");
                return false;
            default:
                console.log("Invalid selection.");
                break;
        }
        return true;
    }

    public static run(): void {
        MenuDisplay.showWelcome();
        
        let continueRunning = true;
        
        while (continueRunning) {
            try {
                console.log("\n");
                const userChoice = MenuDisplay.displayMenu();
                
                continueRunning = Menu.handleMenuChoice(userChoice);
                
                if (continueRunning) {
                    const menuOptions = MenuDisplay.getMenuOptions();
                    const selectedOption = menuOptions[userChoice - 1];
                    if (selectedOption) {
                        MenuDisplay.showCompletion(selectedOption);
                    }
                }
                
            } catch (error) {
                MenuDisplay.showError();
            }
        }
        
        MenuDisplay.showGoodbye();
    }
}