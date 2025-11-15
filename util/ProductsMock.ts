import { Bike } from "../model/BIke";
import { MoutainBike } from "../model/MoutainBike";
import { RoadBike } from "../model/RoadBike";
import { EletricBike } from "../model/EletricBike";

export const mockProducts: Bike[] = [
    new MoutainBike(
        "Trek Marlin 7 MTB", 
        "Mountain bike profissional com quadro de alumínio, suspensão dianteira RockShox, freios a disco hidráulicos Shimano e câmbio 21v. Ideal para trilhas e terrenos acidentados.", 
        3299.00, 
        5, 
        "mtb", 
        1, // userId
        "Hardtail",
        "Aluminum"
    ),
    
    new MoutainBike(
        "Specialized Stumpjumper", 
        "Full suspension mountain bike com quadro de carbono, suspensão traseira e dianteira, componentes Shimano XT e rodas tubeless ready.", 
        8999.00, 
        2, 
        "mtb", 
        2, // userId
        "Full",
        "Carbon"
    ),
    
    new RoadBike(
        "Specialized Allez Elite", 
        "Bike speed de alta performance com quadro de alumínio, grupo Shimano Claris 16v, rodas 700c e geometria agressiva. Peso de apenas 9.5kg.", 
        4599.00, 
        3, 
        "road", 
        1, // userId
        16,
        "Aluminum"
    ),
    
    new RoadBike(
        "Canyon Ultimate CF SL", 
        "Speed de competição com quadro de fibra de carbono, grupo Shimano Ultegra Di2 eletrônico, rodas de carbono e peso ultra leve de 7.2kg.", 
        15999.00, 
        1, 
        "road", 
        3, // userId
        22,
        "Carbon"
    ),
    
    new EletricBike(
        "Caloi E-Vibe Urban", 
        "E-bike urbana com motor Bosch de 250W, bateria de lítio 36V, autonomia de até 60km, display LCD integrado e sistema de assistência inteligente.", 
        5999.00, 
        4, 
        "elétrica", 
        2, // userId
        400,
        60
    ),
    
    new EletricBike(
        "Trek Powerfly FS 9", 
        "E-MTB com motor Bosch Performance Line CX, bateria 625Wh, suspensão full e componentes Shimano Deore XT. Autonomia de até 100km em modo eco.", 
        18999.00, 
        1, 
        "elétrica", 
        1, // userId
        625,
        100
    ),
    
    new MoutainBike(
        "Giant Talon 29er", 
        "Mountain bike de entrada com rodas 29', quadro de alumínio ALUXX, suspensão dianteira SR Suntour e freios a disco mecânicos.", 
        1899.00, 
        8, 
        "mtb", 
        3, // userId
        "Hardtail",
        "Steel"
    ),
    
    new RoadBike(
        "Oggi Velloce Disc", 
        "Speed nacional com quadro de alumínio, freios a disco, grupo Shimano Sora 18v e design aerodinâmico. Excelente custo-benefício.", 
        2799.00, 
        6, 
        "road", 
        2, // userId
        18,
        "Aluminum"
    )
]
    