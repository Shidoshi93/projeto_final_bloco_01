import { ProductRepository } from "../repository/ProductRepository";
import { ProductOutput } from "../types/Product";

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    public addProduct(product: ProductOutput): void {
        this.productRepository.addProduct(product);
    }

    public getProductById(id: number): ProductOutput | null {
        return this.productRepository.getProductById(id);
    }

    public updateProduct(id: number, product: ProductOutput): void {
        this.productRepository.updateProduct(id, product);
    }

    public deleteProduct(id: number): void {
        this.productRepository.deleteProduct(id);
    }

    public listAllProducts(): ProductOutput[] {
        return this.productRepository.listAllProducts();
    }
}