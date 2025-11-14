import { PurchaseService } from "../service/PurchaseService";
import { Purchase } from "../types/Purchase";

export class PurchaseController {
    private purchaseService: PurchaseService;

    constructor(purchaseService: PurchaseService) {
        this.purchaseService = purchaseService;
    }

    public processPurchase(
        productId: number, 
        quantity: number, 
        buyerUsername: string,
        paymentMethod: string,
        shippingAddress: string,
        deliveryType: string
    ): { success: boolean; message: string; purchaseId?: number } {
        return this.purchaseService.buyProduct(
            productId,
            quantity,
            buyerUsername,
            paymentMethod,
            shippingAddress,
            deliveryType
        );
    }

    public getUserPurchaseHistory(username: string): Purchase[] {
        return this.purchaseService.getUserPurchases(username);
    }

    public getPurchaseById(purchaseId: number): Purchase | null {
        return this.purchaseService.getPurchaseDetails(purchaseId);
    }

    public updatePurchaseStatus(purchaseId: number, status: Purchase['status']): boolean {
        return this.purchaseService.updateOrderStatus(purchaseId, status);
    }

    public validatePurchase(productId: number, quantity: number): { isValid: boolean; message: string } {
        return this.purchaseService.validatePurchaseData(productId, quantity);
    }

    public calculateTotal(productId: number, quantity: number): number | null {
        return this.purchaseService.calculatePurchaseTotal(productId, quantity);
    }

    public listAllPurchases(): Purchase[] {
        return this.purchaseService.getAllPurchases();
    }

    public displayPurchaseHistory(username: string): void {
        console.log(`\n=== PURCHASE HISTORY FOR ${username.toUpperCase()} ===`);
        const purchases = this.getUserPurchaseHistory(username);

        if (purchases.length === 0) {
            console.log("No purchases found.");
            return;
        }

        purchases.forEach((purchase: Purchase) => {
            console.log(`\nPurchase ID: ${purchase.id}`);
            console.log(`Product: ${purchase.productName}`);
            console.log(`Quantity: ${purchase.quantity}`);
            console.log(`Unit Price: R$ ${purchase.unitPrice.toFixed(2)}`);
            console.log(`Total: R$ ${purchase.totalPrice.toFixed(2)}`);
            console.log(`Payment: ${purchase.paymentMethod}`);
            console.log(`Delivery: ${purchase.deliveryType}`);
            console.log(`Status: ${purchase.status}`);
            console.log(`Date: ${purchase.purchaseDate.toLocaleDateString()}`);
            console.log("------------------------");
        });
    }
}