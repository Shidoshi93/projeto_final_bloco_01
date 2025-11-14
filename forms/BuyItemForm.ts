import { question, keyInSelect } from "readline-sync";

interface BuyItemDetails {
    itemId: string;
    quantity: number;
    paymentMethod: string;
    shippingAddress: string;
    typeOfDelivery: string | undefined;
}

const typeOfDeliveryOptions: string[] = [
    "Standard Shipping",
    "Express Shipping",
    "In-Store Pickup"
];

export function buyItem(): void {
    console.log("Buy Item Form");

    const itemId: string = question("Enter the Item ID to purchase: ");
    const quantity: number = parseInt(question("Enter quantity to purchase: "), 10);
    const paymentMethod: string = question("Enter payment method (e.g., credit card, PayPal): ");
    const typeOfDeliveryIndex: number = keyInSelect(typeOfDeliveryOptions, "Select type of delivery:") + 1;
    
    if (typeOfDeliveryIndex === -1) {
        console.log("No delivery option selected. Purchase cancelled.");
        return;
    }

    const typeOfDelivery: string | undefined= typeOfDeliveryOptions[typeOfDeliveryIndex];

    const shippingAddress: string = question("Enter shipping address: ");

    const purchaseDetails: BuyItemDetails = {
        itemId,
        quantity,
        paymentMethod,
        shippingAddress,
        typeOfDelivery
    };

    // call the controller function to handle item purchase here

    console.log(`Successfully purchased ${quantity} of item ID: ${itemId}`);
}