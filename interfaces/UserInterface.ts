import { Endereco } from "../model/Endereco";

export interface UserInterface {
    loginUser(username: string, password: string): boolean;
    registerUser(username: string, password: string, email: string): boolean;
    editProfile(username: string, password: string, email: string): boolean;
    deleteUser(username: string): boolean;
    addressUser(username: string, endereco: Endereco): boolean;
}