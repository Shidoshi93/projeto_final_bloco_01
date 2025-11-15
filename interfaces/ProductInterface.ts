import { Bike } from "../model/BIke";

export interface ProductInterface {
    addProduct(product: Bike): void;
    getProductById(id: number): Bike | null;
    updateProduct(id: number, updatedProduct: Bike): void;
    deleteProduct(id: number): void;
    listAllProducts(): Bike[];
}