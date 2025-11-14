import { ProductService } from "../service/ProductService";

export class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public createProduct(data: any): void {
        this.productService.addProduct(data);
    }

    public getProduct(id: number): any {
        return this.productService.getProductById(id);
    }

    public updateProduct(id: number, data: any): void {
        this.productService.updateProduct(id, data);
    }

    public deleteProduct(id: number): void {
        this.productService.deleteProduct(id);
    }

    public listProducts(): any[] {
        return this.productService.listAllProducts();
    }
}