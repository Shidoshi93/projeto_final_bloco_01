import { LoginForm } from "../forms/LoginForm";
import { UserRegistrationForm } from "../forms/UserRegistrationForm";
import { BuyItemForm } from "../forms/BuyItemForm";
import { ProductRegistrationForm } from "../forms/ProductRegistrationForm";
import { EditProfileForm } from "../forms/EditProfileForm";
import { PurchaseHistoryForm } from "../forms/PurchaseHistoryForm";
import { ProductController } from "../controller/ProductController";
import { ProductService } from "../service/ProductService";
import { UserController } from "../controller/UserController";
import { UserService } from "../service/UserService";
import { UserRepository } from "../repository/UserRepository";
import { PurchaseController } from "../controller/PurchaseController";
import { PurchaseService } from "../service/PurchaseService";
import { PurchaseRepository } from "../repository/PurchaseRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { SessionManager } from "../util/SessionManager";

export class MenuHandlers {
    private static productRepository: ProductRepository = new ProductRepository();
    private static productService: ProductService = new ProductService();
    private static productController: ProductController = new ProductController(MenuHandlers.productService);
    private static userController: UserController = new UserController(new UserService(new UserRepository()));
    private static purchaseController: PurchaseController = new PurchaseController(
        new PurchaseService(new PurchaseRepository(MenuHandlers.productRepository))
    );

    public static handleLogin(): void {
        const credentials = LoginForm.loginUser();
        if (credentials) {
            const success = MenuHandlers.userController.login(credentials.username, credentials.password);
            if (success) {
                console.log("Login successful! Welcome back!");
            } else {
                console.log("Login failed. Invalid username or password.");
            }
        }
    }

    public static handleUserRegistration(): void {
        const userData = UserRegistrationForm.registerUser();
        if (userData) {
            const success = MenuHandlers.userController.register(userData.username, userData.password, userData.email);
            if (success) {
                console.log("User registered successfully!");
            } else {
                console.log("Registration failed. Username or email already exists.");
            }
        }
    }

    public static handleEditProfile(): void {
        const updatedUserData = EditProfileForm.editProfile();
        if (updatedUserData) {
            const success = MenuHandlers.userController.editProfile(
                updatedUserData.username, 
                updatedUserData.password, 
                updatedUserData.email
            );
            if (success) {
                console.log("Profile updated successfully!");
            } else {
                console.log("Profile update failed. User not found.");
            }
        }
    }

    public static handlePurchase(): void {
        MenuHandlers.listAllProducts();
        
        const purchaseData = BuyItemForm.buyItem();
        if (!purchaseData) {
            console.log("Purchase cancelled.");
            return;
        }

        const productResult = MenuHandlers.productController.getProduct(purchaseData.productId);
        if (!productResult.success || !productResult.product) {
            console.log(`Product not found: ${productResult.message}`);
            return;
        }

        const product = productResult.product;

        const total = MenuHandlers.purchaseController.calculateTotal(purchaseData.productId, purchaseData.quantity);
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

        const result = MenuHandlers.purchaseController.processPurchase(
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

    public static handleSellItem(): void {
        const newProduct = ProductRegistrationForm.registerProduct();
        if (newProduct) {
            const result = MenuHandlers.productController.createProduct(newProduct);
            if (result.success) {
                console.log("Product successfully added to catalog!");
            } else {
                console.log(`Failed to create product: ${result.message}`);
            }
        }
    }

    public static handlePurchaseHistory(): void {
        let continueHistory = true;
        
        while (continueHistory) {
            const choice = PurchaseHistoryForm.displayPurchaseOptions();
            
            switch (choice) {
                case 1:
                    const loggedUser = SessionManager.getCurrentUser();
                    if (loggedUser) {
                        MenuHandlers.purchaseController.displayPurchaseHistory(loggedUser);
                    } else {
                        console.log("No user logged in.");
                    }
                    break;
                    
                case 2:
                    const purchaseId = PurchaseHistoryForm.getPurchaseId();
                    if (purchaseId) {
                        const purchase = MenuHandlers.purchaseController.getPurchaseById(purchaseId);
                        if (purchase) {
                            console.log("\n=== PURCHASE DETAILS ===");
                            console.log(`Purchase ID: ${purchase.id}`);
                            console.log(`Product: ${purchase.productName}`);
                            console.log(`Quantity: ${purchase.quantity}`);
                            console.log(`Unit Price: R$ ${purchase.unitPrice.toFixed(2)}`);
                            console.log(`Total: R$ ${purchase.totalPrice.toFixed(2)}`);
                            console.log(`Buyer: ${purchase.buyerUsername}`);
                            console.log(`Payment Method: ${purchase.paymentMethod}`);
                            console.log(`Shipping Address: ${purchase.shippingAddress}`);
                            console.log(`Delivery Type: ${purchase.deliveryType}`);
                            console.log(`Status: ${purchase.status}`);
                            console.log(`Purchase Date: ${purchase.purchaseDate.toLocaleDateString()}`);
                            console.log("========================");
                        } else {
                            console.log("Purchase not found.");
                        }
                    }
                    break;
                    
                case 3:
                    continueHistory = false;
                    break;
                    
                default:
                    console.log("Invalid selection.");
                    break;
            }
            
            if (continueHistory) {
                console.log("\nPress Enter to continue...");
                require('readline-sync').question('');
            }
        }
    }

    public static listAllProducts(): void {
        console.log("\n=== PRODUCT CATALOG ===");
        const result = MenuHandlers.productController.listProducts();
        
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

    public static handleLogout(): void {
        console.log("You selected Logout.");
        console.log("Logging out... Goodbye!");
    }
}