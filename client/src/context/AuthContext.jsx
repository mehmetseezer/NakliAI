import React, { createContext, useState, useContext, useCallback } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        tokens: JSON.parse(localStorage.getItem('site')) || null,
    }));

    const onLogin = useCallback(async (email, password) => {
        const data = await authService.login(email, password);
        if (data.user && data.tokens) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('site', JSON.stringify(data.tokens));
        }
        setAuth(data);
    }, []);

    const onLogout = useCallback(async () => {
        if (auth.tokens?.refresh?.token) {
            await authService.logout(auth.tokens.refresh.token);
        }
        setAuth({ user: null, tokens: null });
        localStorage.clear();
    }, [auth.tokens]);

    const onRegister = useCallback(async (name, email, password, phone) => {
        const data = await authService.register(name, email, password, phone);
    })

    return (
        <AuthContext.Provider value={{ auth, onLogin, onLogout, onRegister }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
