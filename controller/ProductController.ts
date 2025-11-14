import { ProductService } from "../service/ProductService";
import { ProductInput, ProductOutput } from "../types/Product";

export class ProductController {
    private productService: ProductService;
    private readonly VALID_TYPES = ['mtb', 'road', 'elétrica', 'eletrica', 'electronics'];

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public createProduct(data: any): { success: boolean; message: string } {
        if (!data) {
            return { success: false, message: "Product data is required." };
        }

        if (!data.name || !data.description || !data.price || !data.quantity || !data.userId || !data.type) {
            return { success: false, message: "All fields are required: name, description, price, quantity, userId, type." };
        }

        if (data.name.length < 2) {
            return { success: false, message: "Product name must have at least 2 characters." };
        }

        if (data.price <= 0) {
            return { success: false, message: "Price must be greater than 0." };
        }

        if (data.quantity < 0) {
            return { success: false, message: "Quantity cannot be negative." };
        }

        if (!this.VALID_TYPES.includes(data.type.toLowerCase())) {
            return { success: false, message: `Type must be one of: ${this.VALID_TYPES.join(', ')}` };
        }

        try {
            const productData: ProductOutput = {
                id: 0,
                name: data.name.trim(),
                description: data.description.trim(),
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                userId: parseInt(data.userId),
                type: data.type.toLowerCase()
            };

            this.productService.addProduct(productData);
            return { success: true, message: "Product created successfully." };

        } catch (error) {
            return { success: false, message: "Error creating product." };
        }
    }

    public getProduct(id: number): { success: boolean; message: string; product?: ProductOutput } {
        if (!id || id <= 0) {
            return { success: false, message: "Valid product ID is required." };
        }

        try {
            const product = this.productService.getProductById(id);
            
            if (!product) {
                return { success: false, message: "Product not found." };
            }

            return { success: true, message: "Product found.", product: product };

        } catch (error) {
            return { success: false, message: "Error retrieving product." };
        }
    }

    public updateProduct(id: number, data: any): { success: boolean; message: string } {
        if (!id || id <= 0) {
            return { success: false, message: "Valid product ID is required." };
        }

        if (!data) {
            return { success: false, message: "Update data is required." };
        }

        try {
            const existingProduct = this.productService.getProductById(id);
            if (!existingProduct) {
                return { success: false, message: "Product not found." };
            }

            if (data.name && data.name.length < 2) {
                return { success: false, message: "Name must have at least 2 characters." };
            }

            if (data.price && data.price <= 0) {
                return { success: false, message: "Price must be greater than 0." };
            }

            if (data.quantity && data.quantity < 0) {
                return { success: false, message: "Quantity cannot be negative." };
            }

            if (data.type && !this.VALID_TYPES.includes(data.type.toLowerCase())) {
                return { success: false, message: `Type must be one of: ${this.VALID_TYPES.join(', ')}` };
            }

            const updateData: ProductOutput = { ...existingProduct, id: id };

            if (data.name) updateData.name = data.name.trim();
            if (data.description) updateData.description = data.description.trim();
            if (data.price) updateData.price = parseFloat(data.price);
            if (data.quantity !== undefined) updateData.quantity = parseInt(data.quantity);
            if (data.type) updateData.type = data.type.toLowerCase();
            if (data.userId) updateData.userId = parseInt(data.userId);

            this.productService.updateProduct(id, updateData);
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
            const existingProduct = this.productService.getProductById(id);
            if (!existingProduct) {
                return { success: false, message: "Product not found." };
            }

            this.productService.deleteProduct(id);
            return { success: true, message: "Product deleted successfully." };

        } catch (error) {
            return { success: false, message: "Error deleting product." };
        }
    }

    public listProducts(): { success: boolean; message: string; products: ProductOutput[] } {
        try {
            const products = this.productService.listAllProducts();
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