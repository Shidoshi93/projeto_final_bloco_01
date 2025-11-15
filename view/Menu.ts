import { MenuDisplay } from "./MenuDisplay";
import { MenuHandlers } from "./MenuHandlers";
import { BuyerMenuHandler } from "./BuyerMenuHandler";
import { SellerMenuHandler } from "./SellerMenuHandler";
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
                console.log("You selected Buyer.");
                BuyerMenuHandler.showBuyerMenu();
                break;
            case 4:
                console.log("You selected Seller.");
                if (SessionManager.requireLogin()) {
                    SellerMenuHandler.showSellerMenu();
                }
                break;
            case 5:
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