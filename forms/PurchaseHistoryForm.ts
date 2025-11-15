import * as readlineSync from "readline-sync";

export class PurchaseHistoryForm {
    
    public static viewPurchaseHistory(): boolean {
        console.log("\n=== VIEW PURCHASE HISTORY ===");
        console.log("Displaying your purchase history...");
        return true;
    }

    public static displayPurchaseOptions(): number {
        console.log("\n=== PURCHASE HISTORY OPTIONS ===");
        console.log("1. View my purchase history");
        console.log("2. View purchase details by ID");
        console.log("3. Back to main menu");
        
        let choice: number;
        while (true) {
            choice = readlineSync.questionInt("Enter your choice (1-3): ");
            if (choice >= 1 && choice <= 3) {
                break;
            }
            console.log("Invalid choice. Please enter a number between 1 and 3.");
        }

        return choice;
    }

    public static getPurchaseId(): number | null {
        console.log("\n=== VIEW PURCHASE DETAILS ===");
        
        const purchaseId = readlineSync.questionInt("Enter Purchase ID: ");
        
        if (!purchaseId || purchaseId <= 0) {
            console.log("Invalid Purchase ID.");
            return null;
        }

        return purchaseId;
    }

    public static displayPurchaseStatusOptions(): string | null {
        console.log("\n=== UPDATE PURCHASE STATUS ===");
        console.log("1. Pending");
        console.log("2. Processing"); 
        console.log("3. Shipped");
        console.log("4. Delivered");
        console.log("5. Cancelled");
        
        const choice = readlineSync.questionInt("Select new status (1-5): ");
        
        const statusMap: { [key: number]: string } = {
            1: 'pending',
            2: 'processing',
            3: 'shipped',
            4: 'delivered',
            5: 'cancelled'
        };

        return statusMap[choice] || null;
    }

    public static confirmStatusUpdate(purchaseId: number, newStatus: string): boolean {
        console.log(`\nConfirm status update for Purchase ID ${purchaseId} to "${newStatus}"?`);
        const confirmation = readlineSync.question("Type 'yes' to confirm: ");
        return confirmation.toLowerCase() === 'yes';
    }
}