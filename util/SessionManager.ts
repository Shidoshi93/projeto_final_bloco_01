export class SessionManager {
    private static currentUser: string | null = null;
    private static isLoggedIn: boolean = false;

    public static login(username: string): void {
        SessionManager.currentUser = username;
        SessionManager.isLoggedIn = true;
    }

    public static logout(): void {
        SessionManager.currentUser = null;
        SessionManager.isLoggedIn = false;
    }

    public static getCurrentUser(): string | null {
        return SessionManager.currentUser;
    }

    public static isUserLoggedIn(): boolean {
        return SessionManager.isLoggedIn;
    }

    public static requireLogin(): boolean {
        if (!SessionManager.isLoggedIn) {
            console.log("\nAccess denied! You need to login first.");
            console.log("Please select 'Login' from the menu to authenticate.");
            return false;
        }
        return true;
    }

    public static displayCurrentSession(): void {
        if (SessionManager.isLoggedIn && SessionManager.currentUser) {
            console.log(`\nLogged in as: ${SessionManager.currentUser}`);
        } else {
            console.log("\nNot logged in");
        }
    }

    public static requireLogout(): boolean {
        if (SessionManager.isLoggedIn) {
            console.log("\nYou are already logged in!");
            console.log(`Current user: ${SessionManager.currentUser}`);
            console.log("Please logout first to perform this action.");
            return false;
        }
        return true;
    }
}