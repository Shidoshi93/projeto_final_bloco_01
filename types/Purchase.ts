export type Purchase = {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    buyerUsername: string;
    sellerUserId: number;
    paymentMethod: string;
    shippingAddress: string;
    deliveryType: string;
    purchaseDate: Date;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
};

export type PurchaseInput = {
    productId: number;
    quantity: number;
    buyerUsername: string;
    paymentMethod: string;
    shippingAddress: string;
    deliveryType: string;
};