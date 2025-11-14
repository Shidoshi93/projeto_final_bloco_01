import { ProductInterface } from "../interfaces/ProductInterface";
import { ProductOutput } from "../types/Product";
import { mockProducts } from "../util/ProductsMock";

export class ProductRepository implements ProductInterface {
    private products: ProductOutput[] = [...mockProducts];
    private nextId: number = 16;

    public addProduct(product: ProductOutput): void {
        const newProduct = { ...product, id: this.nextId++ };
        this.products.push(newProduct);
    }

    public getProductById(id: number): ProductOutput | null {
        const product = this.products.find(p => p.id === id);
        return product || null;
    }

    public updateProduct(id: number, updatedProduct: ProductOutput): void {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...updatedProduct, id };
        }
    }

    public deleteProduct(id: number): void {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }

    public listAllProducts(): ProductOutput[] {
        return [...this.products];
    }
}