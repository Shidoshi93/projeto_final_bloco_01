import { questionInt } from "readline-sync";
import { LoginForm } from "../forms/LoginForm";
import { UserRegistrationForm } from "../forms/UserRegistrationForm";
import { BuyItemForm } from "../forms/BuyItemForm";
import { ProductRegistrationForm } from "../forms/ProductRegistrationForm";
import { EditProfileForm } from "../forms/EditProfileForm";
import { ProductController } from "../controller/ProductController";
import { ProductService } from "../service/ProductService";

export class Menu {
    private static productController: ProductController = new ProductController(new ProductService());

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
                LoginForm.loginUser();
                break;
            case 2:
                console.log("You selected Register.");
                UserRegistrationForm.registerUser();
                break;
            case 3:
                console.log("You selected List Products.");
                Menu.listAllProducts();
                break;
            case 4:
                console.log("You selected Buy Item.");
                BuyItemForm.buyItem();
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
                EditProfileForm.editProfile();
                break;
            case 7:
                console.log("You selected Logout.");
                // call the controller function to handle user logout here
                break;
            default:
                console.log("Invalid selection.");
                break;
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
            console.log(`Seller ID: ${product.userId}`);
            console.log("------------------------");
        });
    }

    public static run(): void {
        const userChoice = Menu.displayMenu(Menu.menuOptions);
        Menu.handleMenuChoice(userChoice);
        console.log(`You selected option ${userChoice}: ${Menu.menuOptions[userChoice - 1]}`);
    }
}