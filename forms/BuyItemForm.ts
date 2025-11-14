import { question, keyInSelect, questionInt } from "readline-sync";

interface BuyItemDetails {
    productId: number;
    quantity: number;
    paymentMethod: string;
    shippingAddress: string;
    deliveryType: string;
}

export class BuyItemForm {
    private static typeOfDeliveryOptions: string[] = [
        "Standard Shipping",
        "Express Shipping",
        "In-Store Pickup"
    ];

    public static buyItem(): BuyItemDetails | null {
        console.log("\n=== BUY ITEM FORM ===");

        try {
            const productId: number = questionInt("Enter the Product ID to purchase: ");
            const quantity: number = questionInt("Enter quantity to purchase: ");
            
            if (quantity <= 0) {
                console.log("Invalid quantity. Must be greater than 0.");
                return null;
            }

            const paymentMethod: string = question("Enter payment method (credit card, PayPal, PIX): ");
            if (!paymentMethod.trim()) {
                console.log("Payment method is required.");
                return null;
            }

            const typeOfDeliveryIndex: number = keyInSelect(BuyItemForm.typeOfDeliveryOptions, "Select type of delivery:");
            
            if (typeOfDeliveryIndex === -1) {
                console.log("No delivery option selected. Purchase cancelled.");
                return null;
            }

            const deliveryType: string = BuyItemForm.typeOfDeliveryOptions[typeOfDeliveryIndex] || "Standard Shipping";

            const shippingAddress: string = question("Enter shipping address: ");
            if (!shippingAddress.trim()) {
                console.log("Shipping address is required.");
                return null;
            }

            const purchaseDetails: BuyItemDetails = {
                productId,
                quantity,
                paymentMethod,
                shippingAddress,
                deliveryType
            };

            return purchaseDetails;

        } catch (error) {
            console.log("Error in purchase form. Please try again.");
            return null;
        }
    }

    public static displayPurchaseConfirmation(
        productName: string,
        quantity: number,
        unitPrice: number,
        totalPrice: number,
        deliveryType: string
    ): boolean {
        console.log("\n=== PURCHASE CONFIRMATION ===");
        console.log(`Product: ${productName}`);
        console.log(`Quantity: ${quantity}`);
        console.log(`Unit Price: R$ ${unitPrice.toFixed(2)}`);
        console.log(`Total Price: R$ ${totalPrice.toFixed(2)}`);
        console.log(`Delivery: ${deliveryType}`);
        console.log("=============================");

        const confirmOptions = ["Yes, confirm purchase", "No, cancel"];
        const confirmIndex = keyInSelect(confirmOptions, "Confirm this purchase?");
        
        return confirmIndex === 0;
    }
}