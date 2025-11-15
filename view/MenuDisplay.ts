import { questionInt } from "readline-sync";
import { SessionManager } from "../util/SessionManager";

export class MenuDisplay {
    private static readonly menuOptions: string[] = [
        "Login",
        "Register",
        "Buyer",
        "Seller",
        "Exit"
    ];

    public static displayMenu(): number {
        console.log("=== MAIN MENU ===");
        SessionManager.displayCurrentSession();
        console.log("Please choose an option:");
        console.log("┌─────────────────────────────────┐");
        
        MenuDisplay.menuOptions.forEach((option, index) => {
            const emoji = MenuDisplay.getOptionEmoji(index + 1);
            console.log(`│ ${emoji} ${index + 1}. ${option.padEnd(26)} │`);
        });
        
        console.log("└─────────────────────────────────┘");

        let choice: number;
        while (true) {
            choice = questionInt("👉 Enter your choice (1-" + MenuDisplay.menuOptions.length + "): ");
            if (choice >= 1 && choice <= MenuDisplay.menuOptions.length) {
                break;
            }
            console.log("Invalid choice. Please enter a number between 1 and " + MenuDisplay.menuOptions.length + ".");
        }

        return choice;
    }

    public static getOptionEmoji(choice: number): string {
        const emojis = {
            1: "🔐", // Login
            2: "📝", // Register
            3: "�️", // Buyer
            4: "�", // Seller
            5: "🚪"  // Exit
        };
        return emojis[choice as keyof typeof emojis] || "📌";
    }

    public static showWelcome(): void {
        console.log("Welcome to the World Bike Store!");
        console.log("===========================================");
    }

    public static showCompletion(actionName: string): void {
        console.log(`\nCompleted: ${actionName}`);
        console.log("Press Enter to continue...");
        require('readline-sync').question('');
    }

    public static showError(): void {
        console.log("An error occurred. Please try again.");
        console.log("Press Enter to continue...");
        require('readline-sync').question('');
    }

    public static showGoodbye(): void {
        console.log("\nSystem terminated successfully.");
    }

    public static getMenuOptions(): string[] {
        return [...MenuDisplay.menuOptions];
    }
}