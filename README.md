# 🚴 World Bike Store

E-commerce de bicicletas em TypeScript com Clean Architecture e POO.

## 📋 Funcionalidades

- **Autenticação**: Login/Registro com SessionManager
- **Catálogo**: 8 bicicletas pré-cadastradas (MTB, Road, E-Bike)
- **Venda**: Cadastro de produtos com validação de propriedade
- **Compra**: Seleção por ID com controle de estoque
- **Histórico**: Visualização de compras por usuário
- **Menu**: Fluxos separados para Buyer e Seller

## 🏗️ Arquitetura

```
├── controller/     # Orquestração
|── interface/      # Contratos
├── service/        # Lógica de negócio
├── repository/     # Acesso a dados
├── model/          # Entidades (Bike, MountainBike, RoadBike, ElectricBike, User)
├── forms/          # formulários de interação (LoginForm, RegisterForm, BuyItemForm, SellItemForm, ProductRegistrationForm)
├── view/           # Menu (Menu, MenuDisplay, MenuHandlers, BuyerMenuHandler, SellerMenuHandler)
└── util/           # SessionManager, Mocks
```

## 🚀 Como Rodar

clone o repositório e instale dependências;

`cd` para o diretório raiz do projeto e execute:

```bash
npm install
npm run start
```

## 🧪 Teste Rápido

1. **Registro**: Crie conta (username, password, email)
2. **Buyer**: Liste produtos e compre por ID
3. **Seller**: Cadastre bicicleta (mountain/road/electric)

## 📦 Produtos Mock

- **3 Mountain Bikes**: Trek Marlin 7, Specialized Stumpjumper, Giant Talon 29er
- **3 Road Bikes**: Allez Elite, Canyon Ultimate CF, Oggi Velloce Disc  
- **2 E-Bikes**: Caloi E-Vibe Urban, Trek Powerfly FS 9

## �️ Tecnologias

- TypeScript
- Clean Architecture
- readline-sync para interação no terminal

---

**Desenvolvido com ❤️ em TypeScript**