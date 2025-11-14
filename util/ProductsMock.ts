import { ProductOutput } from "../types/Product";

export const mockProducts: ProductOutput[] = [
    {
        id: 1,
        name: "Bicicleta MTB Trek Marlin 7",
        description: "Mountain bike com quadro de alumínio, suspensão dianteira, freios a disco hidráulicos e câmbio Shimano 21v",
        price: 3299.00,
        quantity: 5,
        type: "mtb",
        userId: 7
    },
    {
        id: 2,
        name: "Bicicleta Road Specialized Allez Elite",
        description: "Bike speed com quadro de alumínio, grupo Shimano Claris 16v, rodas 700c e peso de apenas 9.5kg",
        price: 4599.00,
        quantity: 3,
        type: "road",
        userId: 7
    },
    {
        id: 3,
        name: "Bicicleta Elétrica Caloi E-Vibe Urban",
        description: "E-bike urbana com motor de 250W, bateria de 36V, autonomia de 60km e display LCD integrado",
        price: 5999.00,
        quantity: 2,
        type: "elétrica",
        userId: 8
    },
    {
        id: 4,
        name: "Bicicleta MTB Cannondale Trail 8",
        description: "Mountain bike com quadro SmartForm C3, suspensão SR Suntour, freios mecânicos e pneus 29 polegadas",
        price: 2899.00,
        quantity: 8,
        type: "mtb",
        userId: 9
    },
    {
        id: 5,
        name: "Bicicleta Road Giant Contend 3",
        description: "Bike de estrada com quadro ALUXX-Grade Aluminum, grupo Shimano Claris e geometria endurance",
        price: 3799.00,
        quantity: 4,
        type: "road",
        userId: 9
    },
    {
        id: 6,
        name: "Bicicleta Elétrica Sense E-Urban",
        description: "E-bike urbana com motor central Bosch, bateria 500Wh, freios a disco hidráulicos e luzes integradas",
        price: 7299.00,
        quantity: 3,
        type: "elétrica",
        userId: 10
    },
    {
        id: 7,
        name: "Bicicleta MTB Scott Aspect 970",
        description: "Mountain bike com quadro de alumínio 6061, suspensão Suntour XCT, freios Tektro e rodas 29er",
        price: 2599.00,
        quantity: 6,
        type: "mtb",
        userId: 10
    },
    {
        id: 8,
        name: "Bicicleta Road Merida Scultura 100",
        description: "Speed com quadro Scultura CF2, garfo de carbono, grupo Shimano 105 e peso ultra leve",
        price: 6899.00,
        quantity: 2,
        type: "road",
        userId: 11
    }
];