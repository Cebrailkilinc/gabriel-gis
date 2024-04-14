import React from 'react'
import "../styles/bottombar.css"

import { useDisclosure } from '@chakra-ui/react';

//Components
import LayerDrawer from '../components/drawer/layer-drawer';

//Context
import { useContext } from 'react';
import DrawerContext from '../context/drawer-context';
import MessageContext from '../context/message-context';

const BottomBar = () => {
  const { drawerContent, setDrawerContent } = useContext(DrawerContext)
  const {generalInfoMessage } = useContext(MessageContext)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenDrawer = (drawerType) => {
    setDrawerContent(drawerType)
    onOpen();
  };
  
  return (
    <>
      <div className='bottom-bar' >
        <div className='bottom-bar-content' >
          <div className='bottom-bar-menus' >
            <div className='bottom-bar-menus-items'>
              <img onClick={() => handleOpenDrawer("point-control")} className='bottom-bar-menus-items-img' width="20" height="20" src="https://img.icons8.com/fluency/48/plus-math.png" alt="plus-math" />
              <h6 className='bottom-bar-menus-items-name'>Nokta</h6>
            </div>
            <div className='bottom-bar-menus-items'>
              <img onClick={() => handleOpenDrawer("add-3d-model")} className='bottom-bar-menus-items-img' width="20" height="20" src="https://img.icons8.com/fluency/48/orthogonal-view.png" alt="orthogonal-view" />
              <h6 className='bottom-bar-menus-items-name'>3D Model</h6>
            </div>
          </div>
          <div className='bottom-bar-messages'>{generalInfoMessage}</div>
          <div className='bottom-bar-coordinates'></div>
        </div>
        <LayerDrawer isOpen={isOpen} onClose={onClose} />
      </div>

    </>
  )
}

export default BottomBar