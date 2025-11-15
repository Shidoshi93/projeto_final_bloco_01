import { ProductInterface } from "../interfaces/ProductInterface";
import { Bike } from "../model/BIke";
import { mockProducts } from "../util/ProductsMock";

export class ProductRepository implements ProductInterface {
    private products: Bike[] = [...mockProducts];

    public addProduct(product: Bike): void {
        this.products.push(product);
    }

    public getProductById(id: number): Bike | null {
        const product = this.products.find(p => p.getId() === id);
        return product || null;
    }

    public updateProduct(id: number, updatedProduct: Bike): void {
        const index = this.products.findIndex(p => p.getId() === id);
        if (index !== -1) {
            this.products[index] = updatedProduct;
        }
    }

    public deleteProduct(id: number): void {
        const index = this.products.findIndex(p => p.getId() === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }

    public listAllProducts(): Bike[] {
        return [...this.products];
    }
}