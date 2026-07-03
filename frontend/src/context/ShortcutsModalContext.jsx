import { createContext, useContext, useState } from "react";

const ShortcutsModalContext = createContext(null);

export const ShortcutsModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <ShortcutsModalContext.Provider value={{ isOpen, open, close }}>
            {children}
        </ShortcutsModalContext.Provider>
    );
};

export const useShortcutsModal = () => useContext(ShortcutsModalContext);