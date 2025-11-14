import { questionInt } from "readline-sync";
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

export class Menu {
    private static productRepository: ProductRepository = new ProductRepository();
    private static productService: ProductService = new ProductService();
    private static productController: ProductController = new ProductController(Menu.productService);
    private static userController: UserController = new UserController(new UserService(new UserRepository()));
    private static purchaseController: PurchaseController = new PurchaseController(
        new PurchaseService(new PurchaseRepository(Menu.productRepository))
    );

    private static readonly menuOptions: string[] = [
        "Login",
        "Register",
        "List Products",
        "Buy Item",
        "Sell Item",
        "Purchase History",
        "Edit Profile",
        "Logout",
        "Exit Application"
    ];

    public static displayMenu(options: string[]): number {
        console.log("=== MAIN MENU ===");
        console.log("Please choose an option:");
        console.log("┌─────────────────────────────────┐");
        
        options.forEach((option, index) => {
            const emoji = Menu.getOptionEmoji(index + 1);
            console.log(`│ ${emoji} ${index + 1}. ${option.padEnd(26)} │`);
        });
        
        console.log("└─────────────────────────────────┘");

        let choice: number;
        while (true) {
            choice = questionInt("👉 Enter your choice (1-" + options.length + "): ");
            if (choice >= 1 && choice <= options.length) {
                break;
            }
            console.log("Invalid choice. Please enter a number between 1 and " + options.length + ".");
        }

        return choice;
    }

    private static getOptionEmoji(choice: number): string {
        const emojis = {
            1: "🔐", // Login
            2: "📝", // Register
            3: "📦", // List Products
            4: "🛒", // Buy Item
            5: "💰", // Sell Item
            6: "📋", // Purchase History
            7: "✏️",  // Edit Profile
            8: "👋", // Logout
            9: "🚪"  // Exit
        };
        return emojis[choice as keyof typeof emojis] || "📌";
    }

    public static handleMenuChoice(choice: number): boolean {
        switch (choice) {
            case 1:
                console.log("You selected Login.");
                Menu.handleLogin();
                break;
            case 2:
                console.log("You selected Register.");
                Menu.handleUserRegistration();
                break;
            case 3:
                console.log("You selected List Products.");
                Menu.listAllProducts();
                break;
            case 4:
                console.log("You selected Buy Item.");
                Menu.handlePurchase();
                break;
            case 5:
                console.log("You selected Sell Item.");
                const newProduct = ProductRegistrationForm.registerProduct();
                if (newProduct) {
                    Menu.productController.createProduct(newProduct);
                    console.log("Product successfully added to catalog!");
                }
                break;
            case 6:
                console.log("You selected Purchase History.");
                Menu.handlePurchaseHistory();
                break;
            case 7:
                console.log("You selected Edit Profile.");
                Menu.handleEditProfile();
                break;
            case 8:
                console.log("You selected Logout.");
                console.log("Logging out... Goodbye!");
                break;
            case 9:
                console.log("You selected Exit Application.");
                console.log("Thank you for using our system! Goodbye!");
                return false;
            default:
                console.log("Invalid selection.");
                break;
        }
        return true;
    }

    private static handleLogin(): void {
        const credentials = LoginForm.loginUser();
        if (credentials) {
            const success = Menu.userController.login(credentials.username, credentials.password);
            if (success) {
                console.log("Login successful! Welcome back!");
            } else {
                console.log("Login failed. Invalid username or password.");
            }
        }
    }

    private static handleUserRegistration(): void {
        const userData = UserRegistrationForm.registerUser();
        if (userData) {
            const success = Menu.userController.register(userData.username, userData.password, userData.email);
            if (success) {
                console.log("User registered successfully!");
            } else {
                console.log("Registration failed. Username or email already exists.");
            }
        }
    }

    private static handleEditProfile(): void {
        const updatedUserData = EditProfileForm.editProfile();
        if (updatedUserData) {
            const success = Menu.userController.editProfile(
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

    private static handlePurchase(): void {
        Menu.listAllProducts();
        
        const purchaseData = BuyItemForm.buyItem();
        if (!purchaseData) {
            console.log("Purchase cancelled.");
            return;
        }

        const product = Menu.productController.getProduct(purchaseData.productId);
        if (!product) {
            console.log("Product not found.");
            return;
        }

        const total = Menu.purchaseController.calculateTotal(purchaseData.productId, purchaseData.quantity);
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

        const result = Menu.purchaseController.processPurchase(
            purchaseData.productId,
            purchaseData.quantity,
            purchaseData.buyerUsername,
            purchaseData.paymentMethod,
            purchaseData.shippingAddress,
            purchaseData.deliveryType
        );

        console.log(`\n${result.message}`);
        if (result.success && result.purchaseId) {
            console.log(`Purchase ID: ${result.purchaseId}`);
        }
    }

    private static handlePurchaseHistory(): void {
        let continueHistory = true;
        
        while (continueHistory) {
            const choice = PurchaseHistoryForm.displayPurchaseOptions();
            
            switch (choice) {
                case 1:
                    const userData = PurchaseHistoryForm.viewPurchaseHistory();
                    if (userData) {
                        Menu.purchaseController.displayPurchaseHistory(userData.username);
                    }
                    break;
                    
                case 2:
                    const purchaseId = PurchaseHistoryForm.getPurchaseId();
                    if (purchaseId) {
                        const purchase = Menu.purchaseController.getPurchaseById(purchaseId);
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

    private static listAllProducts(): void {
        console.log("\n=== PRODUCT CATALOG ===");
        const products = Menu.productController.listProducts();
        
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

    public static run(): void {
        console.log("Welcome to the World Bike Store!");
        console.log("===========================================");
        
        let continueRunning = true;
        
        while (continueRunning) {
            try {
                console.log("\n");
                const userChoice = Menu.displayMenu(Menu.menuOptions);
                
                continueRunning = Menu.handleMenuChoice(userChoice);
                
                if (continueRunning) {
                    console.log(`\nCompleted: ${Menu.menuOptions[userChoice - 1]}`);
                    console.log("Press Enter to continue...");
                    require('readline-sync').question('');
                }
                
            } catch (error) {
                console.log("An error occurred. Please try again.");
                console.log("Press Enter to continue...");
                require('readline-sync').question('');
            }
        }
        
        console.log("\nSystem terminated successfully.");
    }
}