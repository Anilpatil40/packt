import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") ?? null));
    }, []);

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
        fetch(`/api/v1/logout`, { method: "POST" });
    }

    return (
        <Context.Provider value={{ user, setUser, logout }}>
            {children}
        </Context.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(Context);
};
