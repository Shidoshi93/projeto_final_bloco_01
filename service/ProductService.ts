import { Bike } from "../model/BIke";
import { ProductRepository } from "../repository/ProductRepository";

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    public addProduct(product: Bike): void {
        this.productRepository.addProduct(product);
    }

    public getProductById(id: number): Bike | null {
        return this.productRepository.getProductById(id);
    }

    public updateProduct(id: number, product: Bike): void {
        this.productRepository.updateProduct(id, product);
    }

    public deleteProduct(id: number): void {
        this.productRepository.deleteProduct(id);
    }

    public listAllProducts(): Bike[] {
        return this.productRepository.listAllProducts();
    }
}