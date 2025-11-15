import { Endereco } from "../model/Endereco";
import { User } from "../model/User";

export interface UserInterface {
    loginUser(username: string, password: string): boolean;
    registerUser(user: User): boolean;
    editProfile(user: User): boolean;
    deleteUser(username: string): boolean;
    addressUser(username: string, endereco: Endereco): boolean;
}