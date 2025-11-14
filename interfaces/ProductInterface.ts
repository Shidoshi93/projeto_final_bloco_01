import Product from "../types/Product";

export interface ProductInterface {
    addProduct(product: Product): void;
    getProductById(id: number): Product | null;
    updateProduct(id: number, updatedProduct: Product): void;
    deleteProduct(id: number): void;
    listAllProducts(): Product[];
}