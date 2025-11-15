import { Bike } from "../model/BIke";
import { ProductService } from "../service/ProductService";
import { ProductOutput } from "../types/Product";
import { bikeTypes } from "../util/ProductsMock";

export class ProductController {
    private productService: ProductService;
    private readonly VALID_TYPES = bikeTypes;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public createProduct(data: Bike): { success: boolean; message: string } {
        if (!data) {
            return { success: false, message: "Product data is required." };
        }

        if (!data.getName() || !data.getDescription() || !data.getPrice() || !data.getQuantity() || !data.getUserId() || !data.getType()) {
            return { success: false, message: "All fields are required: name, description, price, quantity, userId, type." };
        }

        if (data.getName().length < 2) {
            return { success: false, message: "Product name must have at least 2 characters." };
        }

        if (data.getPrice() <= 0) {
            return { success: false, message: "Price must be greater than 0." };
        }

        if (data.getQuantity() < 0) {
            return { success: false, message: "Quantity cannot be negative." };
        }

        if (!Object.values(this.VALID_TYPES).includes(data.getType().toLowerCase())) {
            return { success: false, message: `Type must be one of: ${Object.values(this.VALID_TYPES).join(', ')}` };
        }

        try {
            this.productService.addProduct(data);
            return { success: true, message: "Product created successfully." };

        } catch (error) {
            return { success: false, message: "Error creating product." };
        }
    }

    public getProduct(id: number): { success: boolean; message: string; product?: Bike } {
        if (!id || id <= 0) {
            return { success: false, message: "Valid product ID is required." };
        }

        try {
            const product: Bike | null = this.productService.getProductById(id);
            
            if (!product) {
                return { success: false, message: "Product not found." };
            }

            return { success: true, message: "Product found.", product: product };

        } catch (error) {
            return { success: false, message: "Error retrieving product." };
        }
    }

    public updateProduct(id: number, data: Bike): { success: boolean; message: string } {
        if (!id || id <= 0) {
            return { success: false, message: "Valid product ID is required." };
        }

        if (!data) {
            return { success: false, message: "Update data is required." };
        }

        try {
            const existingProduct: Bike | null = this.productService.getProductById(id);
            if (!existingProduct) {
                return { success: false, message: "Product not found." };
            }

            this.productService.updateProduct(id, data);
            return { success: true, message: "Product updated successfully." };

        } catch (error) {
            return { success: false, message: "Error updating product." };
        }
    }

    public deleteProduct(id: number): { success: boolean; message: string } {
        if (!id || id <= 0) {
            return { success: false, message: "Valid product ID is required." };
        }

        try {
            const existingProduct: Bike | null = this.productService.getProductById(id);
            if (!existingProduct) {
                return { success: false, message: "Product not found." };
            }

            this.productService.deleteProduct(id);
            return { success: true, message: "Product deleted successfully." };

        } catch (error) {
            return { success: false, message: "Error deleting product." };
        }
    }

    public listProducts(): { success: boolean; message: string; products: Bike[] } {
        try {
            const products: Bike[] = this.productService.listAllProducts();
            return {
                success: true,
                message: `Found ${products.length} products.`,
                products: products
            };

        } catch (error) {
            return {
                success: false,
                message: "Error retrieving products.",
                products: []
            };
        }
    }
}