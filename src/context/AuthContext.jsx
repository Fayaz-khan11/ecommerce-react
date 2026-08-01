import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

function getStoredUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function getStoredCurrentUser() {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getStoredCurrentUser());

    useEffect(() => {
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    }, [user]);

    function signUp(name, email, password) {
        const users = getStoredUsers();
        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
            return { error: "User already exists" };
        }

        const userData = { name, email, password };
        users.push(userData);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        const sessionUser = { name, email };
        setUser(sessionUser);

        return { success: true, message: "User registered successfully" };
    }

    function signIn(email, password) {
        if (!email || !password) {
            return { error: "Email and password are required" };
        }

        const users = getStoredUsers();
        const existingUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!existingUser) {
            return { error: "Invalid email or password" };
        }

        const sessionUser = { name: existingUser.name, email: existingUser.email };
        setUser(sessionUser);

        return { success: true, message: "User logged in successfully" };
    }

    function signOut() {
        setUser(null);
        return { success: true, message: "User logged out successfully" };
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
