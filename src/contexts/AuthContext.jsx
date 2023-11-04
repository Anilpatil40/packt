import { createContext, useContext, useState } from "react";

const Context = createContext();

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);

    function logout() {
        setUser(null);
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
