import { Endereco } from "../model/Endereco";

type User = {
    username: string;
    password: string;
    email: string;
    endereco?: Endereco;
};

export default User;