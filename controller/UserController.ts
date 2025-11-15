import { User } from "../model/User";
import { UserService } from "../service/UserService";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public login(username: string, password: string): boolean {
        return this.userService.loginUser(username, password);
    }

    public register(user: User): boolean {
        return this.userService.registerUser(user);
    }

    public editProfile(user: User): boolean {
        return this.userService.editProfile(user);
    }

    public deleteUser(username: string): boolean {
        return this.userService.deleteUser(username);
    }

    public addressUser(username: string, endereco: any): boolean {
        return this.userService.addressUser(username, endereco);
    }
}