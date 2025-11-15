export type ProductOutput = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    type: string;
    userId: number;
};

export type ProductInput = Omit<ProductOutput, 'id' | 'type'>;