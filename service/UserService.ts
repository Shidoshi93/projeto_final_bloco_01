import { UserInterface } from "../interfaces/UserInterface";

export class UserService {
    private userRepository: UserInterface;

    constructor(userRepository: UserInterface) {
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
}