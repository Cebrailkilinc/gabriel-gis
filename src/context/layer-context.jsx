import { createContext, useState } from "react";

const LayerContext = createContext();

export const LayerProvider = ({ children }) => {

    const [data, setData] = useState([
       
           

    ])
    const datas = {
        data, setData
    }
    return <LayerContext.Provider value={datas}  >{children}</LayerContext.Provider>;
};

export default LayerContext;



