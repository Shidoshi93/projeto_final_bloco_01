import { UserInterface } from "../interfaces/UserInterface";
import { Endereco } from "../model/Endereco";
import User from "../types/UserTypes";
import { UsersMock } from "../util/UsersMock";

export class UserRepository implements UserInterface {
    private users: User[] = [];

    constructor() {
        // Initialize with mock users
        this.initializeMockUsers();
    }

    private initializeMockUsers(): void {
        const mockUsers = UsersMock.getUsers();
        mockUsers.forEach(mockUser => {
            this.users.push({
                username: mockUser.getUsername(),
                password: mockUser.getPassword(),
                email: mockUser.getEmail()
            });
        });
    }

    public loginUser(username: string, password: string): boolean {
        const user = this.users.find(u => u.username === username && u.password === password);
        return !!user;
    }

    public registerUser(username: string, password: string, email: string): boolean {
        const userExists = this.users.some(u => u.username === username || u.email === email);
        if (userExists) {
            return false;
        }
        this.users.push({ username, password, email });
        return true;
    }

    public editProfile(username: string, password: string, email: string): boolean {
        const userIndex = this.users.findIndex(u => u.username === username);
        if (userIndex === -1) {
            return false;
        }
        this.users[userIndex] = { username, password, email };
        return true;
    }

    public deleteUser(username: string): boolean {
        const userIndex = this.users.findIndex(u => u.username === username);
        if (userIndex === -1) {
            return false;
        }
        this.users.splice(userIndex, 1);
        return true;
    }

    addressUser(username: string, endereco: Endereco): boolean {
        const user = this.users.find(u => u.username === username);
        if (!user) {
            return false;
        }
        user.endereco = endereco;
        return true;
    }
}