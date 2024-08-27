import { createContext, useContext, useEffect, useState } from "react";
import { backgroundStorage } from "../utils/constants/constants";


const LocalStorageContext = createContext();

const useLocalStorage = () => {
    return useContext(LocalStorageContext);
};

const LocalStorageProvider = ({children}) => {
    const [background, setBackground] = useState('');

    const changeBackground = (newColor) => {
        localStorage.setItem(backgroundStorage, newColor);
        setBackground(newColor);
      };

    // get the background color from localStorage
    useEffect(() => {
        setBackground(localStorage.getItem(backgroundStorage));
    }, []);

    return (
        <LocalStorageContext.Provider value={{background, setBackground, changeBackground}}>
            {children}
        </LocalStorageContext.Provider>
    );
}

export {LocalStorageProvider, useLocalStorage};

