import { questionInt } from "readline-sync";
import { LoginForm } from "../forms/LoginForm";
import { UserRegistrationForm } from "../forms/UserRegistrationForm";
import { BuyItemForm } from "../forms/BuyItemForm";
import { ProductRegistrationForm } from "../forms/ProductRegistrationForm";
import { EditProfileForm } from "../forms/EditProfileForm";
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
        "Edit Profile",
        "Logout"
    ];

    public static displayMenu(options: string[]): number {
        console.log("Please choose an option:");
        options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });

        let choice: number;
        while (true) {
            choice = questionInt("Enter the number of your choice: ");
            if (choice >= 1 && choice <= options.length) {
                break;
            }
            console.log("Invalid choice. Please try again.");
        }

        return choice;
    }

    public static handleMenuChoice(choice: number): void {
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
                console.log("You selected Edit Profile.");
                Menu.handleEditProfile();
                break;
            case 7:
                console.log("You selected Logout.");
                console.log("Logging out... Goodbye!");
                break;
            default:
                console.log("Invalid selection.");
                break;
        }
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
        // Primeiro mostrar produtos disponíveis
        Menu.listAllProducts();
        
        // Coletar dados da compra
        const purchaseData = BuyItemForm.buyItem();
        if (!purchaseData) {
            console.log("Purchase cancelled.");
            return;
        }

        // Buscar produto para mostrar confirmação
        const product = Menu.productController.getProduct(purchaseData.productId);
        if (!product) {
            console.log("Product not found.");
            return;
        }

        // Calcular total
        const total = Menu.purchaseController.calculateTotal(purchaseData.productId, purchaseData.quantity);
        if (total === null) {
            console.log("Unable to calculate total. Product may not be available.");
            return;
        }

        // Mostrar confirmação da compra
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

        // Processar compra
        const result = Menu.purchaseController.processPurchase(
            purchaseData.productId,
            purchaseData.quantity,
            purchaseData.buyerUsername,
            purchaseData.paymentMethod,
            purchaseData.shippingAddress,
            purchaseData.deliveryType
        );

        // Mostrar resultado
        console.log(`\n${result.message}`);
        if (result.success && result.purchaseId) {
            console.log(`Purchase ID: ${result.purchaseId}`);
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
        const userChoice = Menu.displayMenu(Menu.menuOptions);
        Menu.handleMenuChoice(userChoice);
        console.log(`You selected option ${userChoice}: ${Menu.menuOptions[userChoice - 1]}`);
    }
}