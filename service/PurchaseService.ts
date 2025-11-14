import { PurchaseRepository } from "../repository/PurchaseRepository";
import { Purchase } from "../types/Purchase";

export class PurchaseService {
    private purchaseRepository: PurchaseRepository;

    constructor(purchaseRepository: PurchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public buyProduct(
        productId: number, 
        quantity: number, 
        buyerUsername: string,
        paymentMethod: string,
        shippingAddress: string,
        deliveryType: string
    ): { success: boolean; message: string; purchaseId?: number } {
        try {
            // Validar dados de entrada
            if (!productId || !quantity || !buyerUsername || !paymentMethod || !shippingAddress || !deliveryType) {
                return {
                    success: false,
                    message: "All fields are required for purchase."
                };
            }

            // Validar quantidade
            if (quantity <= 0) {
                return {
                    success: false,
                    message: "Quantity must be greater than 0."
                };
            }

            // Calcular total antes da compra
            const total = this.purchaseRepository.calculateTotal(productId, quantity);
            if (total === null) {
                return {
                    success: false,
                    message: "Product not found or unavailable."
                };
            }

            // Processar compra
            const success = this.purchaseRepository.processPurchase(
                productId, 
                quantity, 
                buyerUsername, 
                paymentMethod, 
                shippingAddress, 
                deliveryType
            );

            if (success) {
                // Buscar a compra criada para retornar o ID
                const userPurchases = this.purchaseRepository.getPurchaseHistory(buyerUsername);
                const latestPurchase = userPurchases[userPurchases.length - 1];

                const result: { success: boolean; message: string; purchaseId?: number } = {
                    success: true,
                    message: `Purchase successful! Total: R$ ${total.toFixed(2)}`
                };
                
                if (latestPurchase) {
                    result.purchaseId = latestPurchase.id;
                }
                
                return result;
            } else {
                return {
                    success: false,
                    message: "Purchase failed. Please check product availability."
                };
            }

        } catch (error) {
            return {
                success: false,
                message: "An error occurred while processing the purchase."
            };
        }
    }

    public getUserPurchases(username: string): Purchase[] {
        return this.purchaseRepository.getPurchaseHistory(username);
    }

    public getPurchaseDetails(purchaseId: number): Purchase | null {
        return this.purchaseRepository.getPurchaseById(purchaseId);
    }

    public updateOrderStatus(purchaseId: number, status: Purchase['status']): boolean {
        return this.purchaseRepository.updatePurchaseStatus(purchaseId, status);
    }

    public validatePurchaseData(
        productId: number, 
        quantity: number
    ): { isValid: boolean; message: string } {
        if (!this.purchaseRepository.validatePurchase(productId, quantity)) {
            return {
                isValid: false,
                message: "Purchase cannot be completed. Check product availability and quantity."
            };
        }

        return {
            isValid: true,
            message: "Purchase data is valid."
        };
    }

    public calculatePurchaseTotal(productId: number, quantity: number): number | null {
        return this.purchaseRepository.calculateTotal(productId, quantity);
    }

    public getAllPurchases(): Purchase[] {
        return this.purchaseRepository.getAllPurchases();
    }
}