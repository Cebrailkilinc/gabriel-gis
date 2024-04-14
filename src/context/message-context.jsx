import { createContext, useState, useEffect } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {

    const [generalInfoMessage, setGeneralInfoMessage] = useState("Bir obje seçin !")
    const [generalLoading, setGeneralLoading] = useState(false)

    useEffect(() => {
        const handleScroll = (event) => {
            if (event.deltaY > 0 || event.deltaY < 0 ) {
                // Scroll aşağı doğru
                setGeneralInfoMessage("Bir obje seçin !");
            } 
        };

        window.addEventListener("wheel", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);
    
    const data = {
        generalInfoMessage,
        setGeneralInfoMessage,
        generalLoading, setGeneralLoading
    }
    return <MessageContext.Provider value={data}  >{children}</MessageContext.Provider>;
};

export default MessageContext;
