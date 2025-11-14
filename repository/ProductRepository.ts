import { ProductInterface } from "../interfaces/ProductInterface";
import { mockProducts } from "../util/ProductsMock";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    type: string;
};

export class ProductRepository implements ProductInterface {
    private products: Product[] = [...mockProducts];
    private nextId: number = 16;

    public addProduct(product: Product): void {
        const newProduct = { ...product, id: this.nextId++ };
        this.products.push(newProduct);
    }

    public getProductById(id: number): Product | null {
        const product = this.products.find(p => p.id === id);
        return product || null;
    }

    public updateProduct(id: number, updatedProduct: Product): void {
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

    public listAllProducts(): Product[] {
        return [...this.products];
    }
}