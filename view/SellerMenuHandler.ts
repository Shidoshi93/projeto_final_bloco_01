import { ProductRegistrationForm } from "../forms/ProductRegistrationForm";
import { ProductController } from "../controller/ProductController";
import { ProductService } from "../service/ProductService";
import { SessionManager } from "../util/SessionManager";
import { questionInt, question, keyInSelect } from "readline-sync";

export class SellerMenuHandler {
    private static productService: ProductService = new ProductService();
    private static productController: ProductController = new ProductController(SellerMenuHandler.productService);

    public static showSellerMenu(): void {
        let keepRunning = true;

        while (keepRunning) {
            console.log('\n=== SELLER MENU ===');
            console.log('[1] Register Product');
            console.log('[2] List Products');
            console.log('[3] Get Product by ID');
            console.log('[4] Delete Product by ID');
            console.log('[5] Update Product');
            console.log('[6] Back');

            const choice = questionInt('Select an option [1-6]: ');
            switch (choice) {
                case 1:
                    SellerMenuHandler.registerProduct();
                    break;
                case 2:
                    SellerMenuHandler.listAllProducts();
                    break;
                case 3:
                    SellerMenuHandler.getProductById();
                    break;
                case 4:
                    SellerMenuHandler.deleteProductById();
                    break;
                case 5:
                    SellerMenuHandler.updateProductById();
                    break;
                case 6:
                    keepRunning = false;
                    break;
                default:
                    console.log('Invalid selection.');
                    break;
            }

            if (keepRunning) {
                console.log('\nPress Enter to continue...');
                question('');
            }
        }
    }

    private static registerProduct(): void {
        const typeIndex = keyInSelect(["mountain", "road", "electric"], "Select bike type: ");
        let type: string = "mountain";
        if (typeof typeIndex === 'number' && typeIndex !== -1) {
            const typeList = ["mountain", "road", "electric"];
            type = typeList[typeIndex] ?? "mountain";
        }
        const newProduct = ProductRegistrationForm.registerProduct(type);
        if (newProduct) {
            const result = SellerMenuHandler.productController.createProduct(newProduct);
            if (result.success) {
                console.log('Product successfully added to catalog!');
            } else {
                console.log(`Failed to create product: ${result.message}`);
            }
        }
    }

    private static listAllProducts(): void {
        console.log("\n=== PRODUCT CATALOG ===");
        const result = SellerMenuHandler.productController.listProducts();
        
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
            product.getDetails();
            /* console.log(`\nID: ${product.id}`);
            console.log(`Name: ${product.name}`);
            console.log(`Description: ${product.description}`);
            console.log(`Price: R$ ${product.price.toFixed(2)}`);
            console.log(`Quantity: ${product.quantity}`);
            console.log(`Type: ${product.type}`);
            console.log("------------------------"); */
        });
    }

    private static getProductById(): void {
        const idInput = questionInt('Enter product ID: ');

        const productResult = SellerMenuHandler.productController.getProduct(idInput);
        if (!productResult.success || !productResult.product) {
            console.log(`Product not found: ${productResult.message}`);
        } else {
            const p = productResult.product;
            console.log('\n=== PRODUCT ===');
            console.log(`ID: ${p.id}`);
            console.log(`Name: ${p.name}`);
            console.log(`Description: ${p.description}`);
            console.log(`Price: R$ ${p.price.toFixed(2)}`);
            console.log(`Quantity: ${p.quantity}`);
            console.log(`Type: ${p.type}`);
            console.log(`Owner UserId: ${p.userId}`);
        }
    }

    private static deleteProductById(): void {
        const idInput = questionInt('Enter product ID to delete: ');
        const productResult = SellerMenuHandler.productController.getProduct(idInput);

        if (!productResult.success || !productResult.product) {
            console.log('Product not found.');
            return;
        }
        const product = productResult.product;
        const currentUserId = SessionManager.getCurrentUserId();
        if (product.userId !== currentUserId) {
            console.log('You can only delete products you own.');
            return;
        }
        const delRes = SellerMenuHandler.productController.deleteProduct(idInput);
        console.log(delRes.message);
    }

    private static updateProductById(): void {
        const idInput = questionInt('Enter product ID to update: ');
        const existingBike = SellerMenuHandler.productService.getProductById(idInput);

        if (!existingBike) {
            console.log('Product not found.');
            return;
        }
        const currentUserId = SessionManager.getCurrentUserId();
        if (existingBike.getUserId() !== currentUserId) {
            console.log('You can only update products you own.');
            return;
        }

        console.log('Leave a field empty to keep current value.');
        const newName = question(`Name (${existingBike.getName()}): `);
        const newDescription = question(`Description (${existingBike.getDescription()}): `);
        const priceInput = questionInt(`Price (${existingBike.getPrice().toFixed(2)}): `);
        const qtyInput = questionInt(`Quantity (${existingBike.getQuantity()}): `);
        const typeIndex = keyInSelect(["mountain", "road", "electric"], "Select bike type (or Cancel to keep): ");

        if (newName && newName.trim().length > 0) existingBike.setName(newName);
        if (newDescription && newDescription.trim().length > 0) existingBike.setDescription(newDescription);
        existingBike.setPrice(priceInput);
        existingBike.setQuantity(qtyInput);
        if (typeof typeIndex === 'number' && typeIndex !== -1) {
            const newType = ["mountain", "road", "electric"][typeIndex];
            if (newType) existingBike.setType(newType);
        }

        const updateRes = SellerMenuHandler.productController.updateProduct(idInput, existingBike);
        console.log(updateRes.message);
    }
}
