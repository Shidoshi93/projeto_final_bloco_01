export class Endereco {
    private rua: string;
    private cidade: string;
    private bairro: string;
    private numero: string;
    private complemento: string;
    private estado: string;
    private cep: string;

    constructor(rua: string, cidade: string, bairro: string, numero: string, complemento: string, estado: string, cep: string) {
        this.rua = rua;
        this.cidade = cidade;
        this.bairro = bairro;
        this.numero = numero;
        this.complemento = complemento;
        this.estado = estado;
        this.cep = cep;
    }

    public getRua(): string {
        return this.rua;
    }

    public getCidade(): string {
        return this.cidade;
    }

    public getBairro(): string {
        return this.bairro;
    }

    public getNumero(): string {
        return this.numero;
    }

    public getComplemento(): string {
        return this.complemento;
    }

    public getEstado(): string {
        return this.estado;
    }

    public getCep(): string {
        return this.cep;
    }
}