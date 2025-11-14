import { UserInterface } from "../interfaces/UserInterface";
import { Endereco } from "../model/Endereco";
import { UserRepository } from "../repository/UserRepository";

export class UserService implements UserInterface {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public loginUser(username: string, password: string): boolean {
        return this.userRepository.loginUser(username, password);
    }

    public registerUser(username: string, password: string, email: string): boolean {
        return this.userRepository.registerUser(username, password, email);
    }

    public editProfile(username: string, password: string, email: string): boolean {
        return this.userRepository.editProfile(username, password, email);
    }

    public deleteUser(username: string): boolean {
        return this.userRepository.deleteUser(username);
    }

    addressUser(username: string, endereco: Endereco): boolean {
        return this.userRepository.addressUser(username, endereco);
    }
}