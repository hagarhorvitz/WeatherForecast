/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { Notify } from "../Utils/Notify";
import { useSnackbar } from "notistack";

interface NotifyContextType {
    notify: Notify;
}

export const NotifyContext = createContext<NotifyContextType | null>(null);


export const NotifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const notify = new Notify(enqueueSnackbar, closeSnackbar);

    return (
        <NotifyContext.Provider value={{notify}}>
            {children}
        </NotifyContext.Provider>
    );
};

export function useNotify() {
    const context = useContext(NotifyContext);
    if (!context) {
        throw new Error('useNotifyContext must be used within a NotifyProvider');
    }
    return context;
}




