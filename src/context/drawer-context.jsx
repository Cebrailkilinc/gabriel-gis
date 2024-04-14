import { createContext, useState } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [drawerContent, setDrawerContent] = useState("context is working!")
    const [sliderValue, setSliderValue] = useState({ x: 0, y: 0, z: 0, size: 0 })
    const [showTooltip, setShowTooltip] = useState({ x: false, y: false, z: false, size: false })
    
    const data = {
        drawerContent,
        setDrawerContent,
        showTooltip, setShowTooltip,
        sliderValue, setSliderValue
    }
    return <DrawerContext.Provider  value={data}  >{children}</DrawerContext.Provider>;
};

export default DrawerContext;
