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
    private static products: Product[] = mockProducts;

    private static nextId: number = 15;

    public addProduct(product: Product): void {
        
        const newProduct = { ...product, id: ProductRepository.nextId++ };
        ProductRepository.products.push(newProduct);
    }

    public getProductById(id: number): Product | null {
        const product = ProductRepository.products.find(p => p.id === id);
        return product || null;
    }

    public updateProduct(id: number, updatedProduct: Product): void {
        const index = ProductRepository.products.findIndex(p => p.id === id);
        if (index !== -1) {
            ProductRepository.products[index] = { ...updatedProduct, id };
        }
    }

    public deleteProduct(id: number): void {
        const index = ProductRepository.products.findIndex(p => p.id === id);
        if (index !== -1) {
            ProductRepository.products.splice(index, 1);
        }
    }

    public listAllProducts(): Product[] {
        return [...ProductRepository.products];
    }
}