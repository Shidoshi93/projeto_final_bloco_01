import { ProductRepository } from "../repository/ProductRepository";
import { Product } from "../types/Product";

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    public addProduct(product: Product): void {
        this.productRepository.addProduct(product);
    }

    public getProductById(id: number): Product | null {
        return this.productRepository.getProductById(id);
    }

    public updateProduct(id: number, product: Product): void {
        this.productRepository.updateProduct(id, product);
    }

    public deleteProduct(id: number): void {
        this.productRepository.deleteProduct(id);
    }

    public listAllProducts(): Product[] {
        return this.productRepository.listAllProducts();
    }
}