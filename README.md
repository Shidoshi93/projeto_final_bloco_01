# 🚴 World Bike Store

Sistema de e-commerce para venda de bicicletas desenvolvido em TypeScript com arquitetura limpa e orientação a objetos.

## 📋 Funcionalidades

### 🔐 Autenticação e Usuários
- ✅ **Sistema de Login/Registro**: Autenticação completa com SessionManager
- ✅ **Registro de Usuários**: Formulário com username, password (oculta) e email
- ✅ **Login Automático**: Após registro, usuário é logado automaticamente
- ✅ **Controle de Sessão**: Acesso às funcionalidades baseado na autenticação
- ✅ **Mocks de Usuários**: Usuários pré-cadastrados para testes (admin, maria, joao, ana, carlos)

### 🛒 Catálogo de Produtos
- ✅ **Listagem de Produtos**: Visualização completa do catálogo com detalhes
- ✅ **Tipos de Bicicletas**: Mountain Bike (MTB), Road Bike e E-Bike
- ✅ **Objetos Concretos**: Hierarquia OOP com classes especializadas
  - `MountainBike`: Suspensão (dianteira/full) e material do quadro
  - `RoadBike`: Quantidade de marchas e material do quadro  
  - `ElectricBike`: Capacidade da bateria e autonomia
- ✅ **Mock de Produtos**: 8 bicicletas pré-cadastradas com especificações realistas

### 💰 Venda de Produtos
- ✅ **Cadastro de Produtos**: Formulários específicos para cada tipo de bicicleta
- ✅ **Validação de Propriedade**: Produtos vinculados ao usuário que os cadastrou
- ✅ **Tipos Validados**: Sistema de validação consistente (mtb, road, elétrica)
- ✅ **Geração de IDs**: IDs únicos baseados em timestamp para cada produto

### 🛍️ Sistema de Compras
- ✅ **Compra de Produtos**: Seleção por ID com validação de estoque
- ✅ **Controle de Estoque**: Atualização automática após compras
- ✅ **Histórico de Compras**: Visualização completa das compras do usuário
- ✅ **Detalhes de Compra**: Informações específicas por ID de compra

### 🎨 Interface e UX
- ✅ **Menu Interativo**: Interface visual com emojis e bordas
- ✅ **Status de Login**: Exibição clara do usuário logado
- ✅ **Arquitetura Modular**: Menu dividido em 3 arquivos (Menu, MenuDisplay, MenuHandlers)
- ✅ **Loop Contínuo**: Sistema permite múltiplas operações na mesma sessão
- ✅ **Feedback Visual**: Mensagens de sucesso/erro claras

## 🏗️ Arquitetura

### Clean Architecture
```
├── Controller/     # Orquestração e conversão de dados
├── Service/        # Regras de negócio
├── Repository/     # Acesso a dados
├── Model/          # Entidades e objetos de domínio
├── Forms/          # Interface com usuário
├── Util/           # Utilitários (SessionManager, Mocks)
└── View/           # Apresentação (Menu)
```

### Orientação a Objetos
- **Herança**: Bike → MountainBike/RoadBike/ElectricBike
- **Polimorfismo**: Diferentes implementações para cada tipo
- **Encapsulamento**: Propriedades específicas por classe
- **Abstração**: Interface comum para todos os tipos de bike

## 🛠️ Tecnologias

- **TypeScript**: Tipagem estática e POO
- **Node.js**: Runtime JavaScript
- **readline-sync**: Interface interativa no terminal
- **Clean Architecture**: Separação de responsabilidades
- **SOLID Principles**: Código limpo e manutenível

## 🚀 Como Executar

### Pré-requisitos
- Node.js 14+ instalado
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd projeto_final_bloco_01

# Instale as dependências
npm install

# Execute a aplicação
npm run start
```

### Uso
1. **Registro**: Crie uma nova conta com username, password e email
2. **Login**: Acesse com credenciais existentes (ou use admin/admin123)
3. **Explorar**: Navegue pelo catálogo de produtos
4. **Comprar**: Selecione produtos por ID e confirme a compra
5. **Vender**: Cadastre suas próprias bicicletas no sistema
6. **Histórico**: Visualize suas compras anteriores

## 👥 Usuários de Teste

| Username | Password | Descrição |
|----------|----------|-----------|
| admin    | admin123 | Administrador |
| maria    | senha123 | Usuária padrão |
| joao     | senha123 | Usuário padrão |
| ana      | senha123 | Usuária padrão |
| carlos   | senha123 | Usuário padrão |

## 📦 Produtos Pré-cadastrados

### Mountain Bikes
- **Trek Marlin 7 MTB**: Alumínio, suspensão dianteira - R$ 3.299
- **Specialized Stumpjumper**: Carbono, full suspension - R$ 8.999
- **Giant Talon 29er**: Entrada, rodas 29" - R$ 1.899

### Road Bikes
- **Specialized Allez Elite**: Alumínio, Shimano Claris - R$ 4.599
- **Canyon Ultimate CF SL**: Carbono, Ultegra Di2 - R$ 15.999
- **Oggi Velloce Disc**: Nacional, freios a disco - R$ 2.799

### E-Bikes
- **Caloi E-Vibe Urban**: Urbana, 60km autonomia - R$ 5.999
- **Trek Powerfly FS 9**: E-MTB, 100km autonomia - R$ 18.999

## 🔄 Próximas Funcionalidades

- [ ] Validação avançada de propriedade de produtos
- [ ] Sistema de endereços para usuários
- [ ] Filtros de produtos (categoria, preço, tipo)
- [ ] Busca de produtos por nome/descrição
- [ ] Edição e exclusão de produtos próprios
- [ ] Relatórios e analytics
- [ ] Sistema de avaliações

## 🏆 Conquistas Técnicas

- ✅ **Arquitetura Limpa**: Separação clara de responsabilidades
- ✅ **POO Completa**: Herança, polimorfismo e encapsulamento
- ✅ **TypeScript Avançado**: Tipagem estrita e interfaces
- ✅ **Menu Refatorado**: Redução de 71% no arquivo principal
- ✅ **Validações Inteligentes**: Sistema otimizado de validação
- ✅ **Mocks Realistas**: Dados de teste diversos e completos
- ✅ **UX Aprimorada**: Interface visual e feedback claro
- ✅ **Sistema de Sessão**: Controle completo de autenticação

---

**Desenvolvido com ❤️ em TypeScript**