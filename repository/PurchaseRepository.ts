import { PurchaseInterface } from "../interfaces/PurchaseInterface";
import { Purchase } from "../types/Purchase";
import { ProductRepository } from "./ProductRepository";

export class PurchaseRepository implements PurchaseInterface {
    private purchases: Purchase[] = [];
    private nextPurchaseId: number = 1;
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public processPurchase(
        productId: number, 
        quantity: number, 
        buyerUsername: string,
        paymentMethod: string,
        shippingAddress: string,
        deliveryType: string
    ): boolean {
        if (!this.validatePurchase(productId, quantity)) {
            return false;
        }

        const product = this.productRepository.getProductById(productId);
        if (!product) {
            return false;
        }

        const totalPrice = this.calculateTotal(productId, quantity);
        if (totalPrice === null) {
            return false;
        }

        const purchase: Purchase = {
            id: this.nextPurchaseId++,
            productId: productId,
            productName: product.name,
            quantity: quantity,
            unitPrice: product.price,
            totalPrice: totalPrice,
            buyerUsername: buyerUsername,
            sellerUserId: product.userId,
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress,
            deliveryType: deliveryType,
            purchaseDate: new Date(),
            status: 'pending'
        };

        this.purchases.push(purchase);

        const updatedProduct = { ...product, quantity: product.quantity - quantity };
        this.productRepository.updateProduct(productId, updatedProduct);

        return true;
    }

    public validatePurchase(productId: number, quantity: number): boolean {
        const product = this.productRepository.getProductById(productId);
        if (!product) {
            console.log("Product not found.");
            return false;
        }

        if (product.quantity < quantity) {
            console.log(`Insufficient stock. Available: ${product.quantity}, Requested: ${quantity}`);
            return false;
        }

        if (quantity <= 0) {
            console.log("Invalid quantity. Must be greater than 0.");
            return false;
        }

        return true;
    }

    public getPurchaseHistory(username: string): Purchase[] {
        return this.purchases.filter(purchase => purchase.buyerUsername === username);
    }

    public calculateTotal(productId: number, quantity: number): number | null {
        const product = this.productRepository.getProductById(productId);
        if (!product) {
            return null;
        }

        return product.price * quantity;
    }

    public getAllPurchases(): Purchase[] {
        return [...this.purchases];
    }

    public getPurchaseById(purchaseId: number): Purchase | null {
        const purchase = this.purchases.find(p => p.id === purchaseId);
        return purchase || null;
    }

    public updatePurchaseStatus(purchaseId: number, status: Purchase['status']): boolean {
        const purchaseIndex = this.purchases.findIndex(p => p.id === purchaseId);
        if (purchaseIndex === -1) {
            return false;
        }

        const purchase = this.purchases[purchaseIndex];
        if (purchase) {
            purchase.status = status;
            return true;
        }
        return false;
    }
}