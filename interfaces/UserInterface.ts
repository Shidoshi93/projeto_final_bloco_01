export interface UserInterface {
    loginUser(username: string, password: string): boolean;
    registerUser(username: string, password: string, email: string): boolean;
    editProfile(username: string, password: string, email: string): boolean;
}