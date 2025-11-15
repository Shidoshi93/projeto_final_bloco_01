import { Purchase } from "../types/Purchase";

export interface PurchaseInterface {
    processPurchase(
        productId: number, 
        quantity: number, 
        buyerUsername: string,
        paymentMethod: string,
        shippingAddress: string,
        deliveryType: string
    ): boolean;
    validatePurchase(productId: number, quantity: number): boolean;

    getPurchaseHistory(username: string): Purchase[];

    calculateTotal(productId: number, quantity: number): number | null;
}