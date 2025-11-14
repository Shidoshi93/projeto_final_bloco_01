import { Product } from "../types/Product";

export const mockProducts: Product[] = [
    {
        id: 1,
        name: "Smartphone Samsung Galaxy S23",
        description: "Smartphone Android com 128GB de armazenamento, câmera tripla de 50MP e tela AMOLED de 6.1 polegadas",
        price: 2499.99,
        quantity: 15,
        type: "Electronics",
        userId: 1
    },
    {
        id: 2,
        name: "Notebook Dell Inspiron 15",
        description: "Notebook com processador Intel i5, 8GB RAM, SSD 256GB e tela Full HD de 15.6 polegadas",
        price: 3299.00,
        quantity: 8,
        type: "Electronics",
        userId: 1
    },
    {
        id: 3,
        name: "Fone de Ouvido Sony WH-1000XM4",
        description: "Fone de ouvido wireless com cancelamento de ruído ativo, bateria de 30 horas e áudio Hi-Res",
        price: 899.90,
        quantity: 25,
        type: "Electronics",
        userId: 2
    },
    {
        id: 4,
        name: "Smart TV LG 55 4K",
        description: "Smart TV LED 55 polegadas com resolução 4K UHD, WebOS, HDR10 e controle por voz",
        price: 2199.00,
        quantity: 6,
        type: "Electronics",
        userId: 2
    },
    {
        id: 5,
        name: "Console PlayStation 5",
        description: "Console de videogame com SSD ultra-rápido, ray tracing em hardware e controle DualSense",
        price: 4499.99,
        quantity: 3,
        type: "Gaming",
        userId: 3
    },
    {
        id: 6,
        name: "Câmera Canon EOS Rebel T7",
        description: "Câmera DSLR de 24.1MP com lente 18-55mm, Wi-Fi integrado e gravação Full HD",
        price: 1899.00,
        quantity: 12,
        type: "Electronics",
        userId: 3
    },
    {
        id: 7,
        name: "Tablet Apple iPad Air",
        description: "Tablet com chip M1, tela Liquid Retina de 10.9 polegadas, 64GB e suporte a Apple Pencil",
        price: 3799.00,
        quantity: 20,
        type: "Electronics",
        userId: 4
    },
    {
        id: 8,
        name: "Smartwatch Apple Watch Series 8",
        description: "Smartwatch com GPS, monitoramento de saúde avançado, resistente à água e tela Always-On",
        price: 2299.00,
        quantity: 18,
        type: "Electronics",
        userId: 4
    },
    {
        id: 9,
        name: "Teclado Mecânico Logitech MX Keys",
        description: "Teclado mecânico sem fio com iluminação inteligente, teclas de baixo perfil e bateria recarregável",
        price: 459.90,
        quantity: 30,
        type: "Accessories",
        userId: 5
    },
    {
        id: 10,
        name: "Mouse Gamer Razer DeathAdder V3",
        description: "Mouse gamer com sensor óptico de 30.000 DPI, switches ópticos e ergonomia para destros",
        price: 299.99,
        quantity: 45,
        type: "Gaming",
        userId: 5
    },
    {
        id: 11,
        name: "Monitor Gamer ASUS 27 144Hz",
        description: "Monitor gamer de 27 polegadas Full HD com taxa de atualização de 144Hz e tecnologia FreeSync",
        price: 1299.00,
        quantity: 10,
        type: "Gaming",
        userId: 6
    },
    {
        id: 12,
        name: "SSD Kingston NV2 1TB",
        description: "SSD NVMe PCIe 4.0 de 1TB com velocidades de leitura de até 3.500 MB/s",
        price: 399.90,
        quantity: 35,
        type: "Components",
        userId: 6
    },
    {
        id: 13,
        name: "Placa de Vídeo RTX 4060",
        description: "Placa de vídeo NVIDIA GeForce RTX 4060 com 8GB GDDR6 e suporte a ray tracing",
        price: 2899.00,
        quantity: 7,
        type: "Components",
        userId: 7
    },
    {
        id: 14,
        name: "Processador AMD Ryzen 5 5600X",
        description: "Processador de 6 núcleos e 12 threads, frequência base de 3.7GHz e boost de até 4.6GHz",
        price: 899.00,
        quantity: 22,
        type: "Components",
        userId: 7
    },
    {
        id: 15,
        name: "Memória RAM Corsair 16GB DDR4",
        description: "Kit de memória RAM DDR4 3200MHz de 16GB (2x8GB) com dissipadores de calor",
        price: 459.90,
        quantity: 40,
        type: "Components",
        userId: 8
    }
];