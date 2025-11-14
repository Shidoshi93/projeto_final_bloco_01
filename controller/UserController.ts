import { UserService } from "../service/UserService";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public login(username: string, password: string): boolean {
        return this.userService.loginUser(username, password);
    }

    public register(username: string, password: string, email: string): boolean {
        return this.userService.registerUser(username, password, email);
    }

    public editProfile(username: string, password: string, email: string): boolean {
        return this.userService.editProfile(username, password, email);
    }
}