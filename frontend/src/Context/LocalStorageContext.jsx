import { createContext, useContext, useEffect, useState } from "react";
import { backgroundStorage } from "../utils/constants/constants";


const LocalStorageContext = createContext();

const useStorage = () => {
    return useContext(LocalStorageContext);
};

const LocalStorageProvider = ({children}) => {
    const [background, setBackground] = useState('');

    const changeBackground = (newColor) => {
        localStorage.setItem(backgroundStorage, newColor);
        setBackground(newColor);
      };

      useEffect(() => {
        const storedBackground = localStorage.getItem(backgroundStorage);
        console.log("Stored background from localStorage:", storedBackground);
        if (storedBackground) {
            setBackground(storedBackground);
            console.log(background)
        }
    }, [background]);

    return (
        <LocalStorageContext.Provider value={{background, setBackground, changeBackground}}>
            {children}
        </LocalStorageContext.Provider>
    );
}

export {LocalStorageProvider, useStorage};

