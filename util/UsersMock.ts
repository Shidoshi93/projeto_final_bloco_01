import { User } from "../model/User";

export const getUsers = (): User[] => {
    return [
        new User(
            "admin",
            "admin123",
            "admin@worldbike.com",
            true
        ),
        new User(
            "joao",
            "senha123",
            "joao@email.com",
            false
        ),
        new User(
            "maria",
            "maria456",
            "maria@email.com",
            true
        ),
        new User(
            "pedro",
            "pedro789",
            "pedro@email.com",
            false
        ),
        new User(
            "ana",
            "ana321",
            "ana@email.com",
            true
        )
    ];
}