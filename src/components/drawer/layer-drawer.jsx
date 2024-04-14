import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react'
import { useContext } from 'react'
import DrawerContext from '../../context/drawer-context'
import AddModel from './all-drawers/add-model'
import Point from './all-drawers/point'
import ParcelInfo from './all-drawers/parcel-info'
import UpdateModel from './all-drawers/update-model'
import LayerContext from '../../context/layer-context'

const LayerDrawer = (props) => {

    const { drawerContent } = useContext(DrawerContext)
    const { data, setData } = useContext(LayerContext)

    const btnRef = React.useRef()   
  
  
    return (
        <>
            <Drawer
                placement='right'
                isOpen={props.isOpen}
                onClose={props.onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader></DrawerHeader>
                    <DrawerBody>
                        {drawerContent === "add-3d-model" ? <AddModel data={data} setData={setData}  /> : null}
                        {drawerContent === "update-3d-model" ? <UpdateModel objetId={props.objetId} setObjectId={props.setObjectId}  data={props.data} setData={props.setData} /> : null}
                        {drawerContent === "point-control" ? <Point /> : null}
                        {drawerContent === "parcel-information" ? <ParcelInfo /> : null}
                    </DrawerBody>                    
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default LayerDrawer