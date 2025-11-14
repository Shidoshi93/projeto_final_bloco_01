import { ProductInput } from "../types/Product";

export interface ProductInterface {
    addProduct(product: ProductInput): void;
    getProductById(id: number): ProductInput | null;
    updateProduct(id: number, updatedProduct: ProductInput): void;
    deleteProduct(id: number): void;
    listAllProducts(): ProductInput[];
}