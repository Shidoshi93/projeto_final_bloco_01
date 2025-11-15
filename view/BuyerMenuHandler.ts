import { BuyItemForm } from "../forms/BuyItemForm";
import { ProductController } from "../controller/ProductController";
import { ProductService } from "../service/ProductService";
import { PurchaseController } from "../controller/PurchaseController";
import { PurchaseService } from "../service/PurchaseService";
import { PurchaseRepository } from "../repository/PurchaseRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { SessionManager } from "../util/SessionManager";
import { questionInt } from "readline-sync";

export class BuyerMenuHandler {
    private static productRepository: ProductRepository = new ProductRepository();
    private static productService: ProductService = new ProductService();
    private static productController: ProductController = new ProductController(BuyerMenuHandler.productService);
    private static purchaseController: PurchaseController = new PurchaseController(
        new PurchaseService(new PurchaseRepository(BuyerMenuHandler.productRepository))
    );

    public static showBuyerMenu(): void {
        let keepRunning = true;

        while (keepRunning) {
            console.log('\n=== BUYER MENU ===');
            console.log('[1] List Products');
            console.log('[2] Buy Item');
            console.log('[3] Back');

            const choice = questionInt('Select an option [1-3]: ');
            switch (choice) {
                case 1:
                    BuyerMenuHandler.listAllProducts();
                    break;
                case 2:
                    if (SessionManager.requireLogin()) {
                        BuyerMenuHandler.handlePurchase();
                    }
                    break;
                case 3:
                    keepRunning = false;
                    break;
                default:
                    console.log('Invalid selection.');
                    break;
            }
        }
    }

    private static listAllProducts(): void {
        console.log("\n=== PRODUCT CATALOG ===");
        const result = BuyerMenuHandler.productController.listProducts();
        
        if (!result.success) {
            console.log(`Error retrieving products: ${result.message}`);
            return;
        }

        const products = result.products;
        
        if (products.length === 0) {
            console.log("No products available.");
            return;
        }

        products.forEach((product: any) => {
            console.log(`\nID: ${product.id}`);
            console.log(`Name: ${product.name}`);
            console.log(`Description: ${product.description}`);
            console.log(`Price: R$ ${product.price.toFixed(2)}`);
            console.log(`Quantity: ${product.quantity}`);
            console.log(`Type: ${product.type}`);
            console.log("------------------------");
        });
    }

    private static handlePurchase(): void {
        BuyerMenuHandler.listAllProducts();
        
        const purchaseData = BuyItemForm.buyItem();
        if (!purchaseData) {
            console.log("Purchase cancelled.");
            return;
        }

        const productResult = BuyerMenuHandler.productController.getProduct(purchaseData.productId);
        if (!productResult.success || !productResult.product) {
            console.log(`Product not found: ${productResult.message}`);
            return;
        }

        const product = productResult.product;

        const total = BuyerMenuHandler.purchaseController.calculateTotal(purchaseData.productId, purchaseData.quantity);
        if (total === null) {
            console.log("Unable to calculate total. Product may not be available.");
            return;
        }

        const confirmed = BuyItemForm.displayPurchaseConfirmation(
            product.name,
            purchaseData.quantity,
            product.price,
            total,
            purchaseData.deliveryType
        );

        if (!confirmed) {
            console.log("Purchase cancelled by user.");
            return;
        }

        const loggedUser = SessionManager.getCurrentUser();
        if (!loggedUser) {
            console.log("Error: No user logged in.");
            return;
        }

        const result = BuyerMenuHandler.purchaseController.processPurchase(
            purchaseData.productId,
            purchaseData.quantity,
            loggedUser,
            purchaseData.paymentMethod,
            purchaseData.shippingAddress,
            purchaseData.deliveryType
        );

        console.log(`\n${result.message}`);
        if (result.success && result.purchaseId) {
            console.log(`Purchase ID: ${result.purchaseId}`);
        }
    }
}
