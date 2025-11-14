import { UserInterface } from "../interfaces/UserInterface";
import { Endereco } from "../model/Endereco";
import { User } from "../model/User";
import { getUsers } from "../util/UsersMock";

export class UserRepository implements UserInterface {
    private users: User[] = [...getUsers()];


    public loginUser(username: string, password: string): boolean {
        const user = this.users.find(u => u.getUsername() === username && u.getPassword() === password);
        return !!user;
    }

    public registerUser(user: User): boolean {
        const userExists = this.users.some(u => u.getUsername() === user.getUsername() || u.getEmail() === user.getEmail());
        if (userExists) {
            return false;
        }
        this.users.push(user);
        return true;
    }

    public editProfile(user: User): boolean {
        const userIndex = this.users.findIndex(u => u.getUsername() === user.getUsername());
        if (userIndex === -1) {
            return false;
        }

        const existingUser = this.users[userIndex];
        if (!existingUser) {
            return false;
        }

        this.users[userIndex] = user;
        return true;
    }

    public deleteUser(username: string): boolean {
        const userIndex = this.users.findIndex(u => u.getUsername() === username);
        if (userIndex === -1) {
            return false;
        }
        this.users.splice(userIndex, 1);
        return true;
    }

    addressUser(username: string, endereco: Endereco): boolean {
        const user = this.users.find(u => u.getUsername() === username);
        if (!user) {
            return false;
        }
        user.setEndereco(endereco);
        return true;
    }
}