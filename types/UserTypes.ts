import { Endereco } from "../model/Endereco";

export type UserMock = {
    username: string;
    password: string;
    email: string;
    isSeller: boolean;
    id: number;
    endereco?: Endereco;
};

export type UserCredentials = {
    username: string;
    password: string;
};

export type UserProfileUpdate = {
    username: string;
    password: string;
    email: string;
};