

import React, { useState, Suspense, lazy, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import Map from 'react-map-gl';
import axios from "axios";
import { polygon, buffer } from '@turf/turf';
import { useDisclosure } from "@chakra-ui/react";
import { v3 } from 'uuid';
import { listAll, getDownloadURL, ref } from 'firebase/storage';
import { modelDb } from '../core/firebase/config';
import parsel18 from "../data/parsel18.json"
import parsel119 from "../data/parsel119.json"

import { Button } from "@chakra-ui/react";
import BottomBar from "../layout/BottomBar";
import Navbar from "../layout/Navbar";


//context
import { useContext } from "react";
import DrawerContext from "../context/drawer-context";
import Loading from "../components/spinner/Loading";
import HoverCoordinate from '../components/hover-coordinate/hoverCoordinate';
import MessageContext from '../context/message-context';
import LayerContext from '../context/layer-context';
import TableOfContent from './TableOfContent';

const LayerDrawer = lazy(() => import('../components/drawer/layer-drawer'));
const MemoizedNavbar = React.memo(Navbar);
const MemoizedBottomBar = React.memo(BottomBar);
const INITIAL_VIEW_STATE = {
    longitude: 38.25166,
    latitude: 37.74785,
    zoom: 13,
    pitch: 0,
    bearing: 0
};


const MapContainer = () => {

    const [hoverCoordinate, setHoverCoordinate] = useState({ lat: 38.25151, long: 37.74783 })
    const [mapController, setMapController] = useState(true)
    const [cursor, setCursor] = useState('all-scroll');
    const [lineColor, setLineColor] = useState([128, 0, 38]);
    const [fillColor, setFillColor] = useState([128, 0, 38, 50]);
    const [objetId, setObjectId] = useState(1)

    //Context
    const {
        drawerContent,
        setDrawerContent,
        setSliderValue,
        sliderValue,
    } = useContext(DrawerContext)
    const { setGeneralInfoMessage, generalLoading, setGeneralLoading } = useContext(MessageContext)
    const { data, setData } = useContext(LayerContext)

    const { isOpen, onOpen, onClose } = useDisclosure();

    const hoverOnMap = (object) => {
        if (object.coordinate) {
            setHoverCoordinate(prevState => (
                {
                    ...prevState,
                    lat: object.coordinate[0],
                    long: object.coordinate[1]
                }
            ))
        }
    }

    //Open Drawer
    const handleOpenParcelDrawer = (drawerType, id) => {
        setDrawerContent(drawerType)
        console.log(id)
        //onOpen();
    };

    const handleOpen3dModelPropertiesDrawer = (drawerType, id) => {
        setDrawerContent(drawerType)
        setDrawerContent("update-3d-model")
        onOpen();
    };

    const handleDragStart = event => {
        const id = event.object.id
        setCursor("grabbing")
        setData(prevData => {
            const newData = [...prevData];
            const updatedItem = { ...newData[id - 1] };
            updatedItem.coordinates = [event.coordinate[0], event.coordinate[1]];
            newData[[id - 1]] = updatedItem;
            return newData;
        });
        setMapController(false)
        setGeneralInfoMessage("Objeyi sürükle !")
    };
    const handleDragStop = event => {
        setMapController(true)
        setGeneralInfoMessage("Obje yeniden konumlandırıldı !")
        setCursor("all-scroll")
    };

    const scenegraphLayers = (item) => {
        return new ScenegraphLayer({
            id: `scenegraph-layer-${item.id}`,
            data: [item],
            pickable: true,
            scenegraph: item.path,
            getPosition: (d) => d.coordinates,
            getOrientation: (d) => [d.x, d.y, d.z],
            getScale: d => [d.size, d.size, d.size],
            _lighting: 'pbr',
            onDrag: handleDragStart,
            onDragEnd: handleDragStop,
            onClick: ({ object }) => {
                handleOpen3dModelPropertiesDrawer(object);
                setGeneralInfoMessage("3D obje seçildi !");
                setSliderValue(prevState => ({
                    ...prevState, x: object.x, y: object.y, z: object.z, size: object.size
                }));
                setObjectId(object.id);
            },
            onHover: ({ object }) => {
                setCursor(object ? "pointer" : "all-scroll");
            },
        })
    }

    const geojsonLayer = [
        new GeoJsonLayer({
            id: 'Parsel-Sınır',
            data: [parsel18, parsel119],
            stroked: true,
            filled: true,
            lineWidthMinPixels: 0.001,
            getLineColor: lineColor, // Çizgi rengi: kırmızı (RGB)
            getFillColor: fillColor,
            pickable: true,
            onClick: ({ object }) => {
                if (object) {
                    const parcelId = object.properties.parselNo;
                    console.log(object) // Örneğin, parselin bir kimliği varsa burada alabilirsiniz
                    handleOpenParcelDrawer("parcel-information", parcelId);
                }
            },
            onHover: ({ object }) => {
                setCursor(object ? "pointer" : "all-scroll");
            },
        }),

        data.map((item) => {
            return scenegraphLayers(item)
        }),

        new TextLayer({
            id: 'Parsel Adı-1',
            data: [{ text: '833/13', position: [38.25151, 37.74783] }],
            getSize: 15,
        }),
    ];

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <MemoizedNavbar />
                <HoverCoordinate hoverCoordinate={hoverCoordinate} />
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={mapController}
                    layers={[geojsonLayer]}
                    style={{ position: "fixed" }}
                    getCursor={() => cursor}
                    onHover={hoverOnMap}
                >
                    <Map
                        mapLib={import('mapbox-gl')}
                        initialViewState={{
                            longitude: -122.4,
                            latitude: 37.8,
                            zoom: 14
                        }}
                        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                        reuseMaps mapStyle={"mapbox://styles/mapbox/streets-v12"}
                        preventStyleDiffing={true}
                    >
                    </Map>
                </DeckGL>;
                <LayerDrawer objetId={objetId} setObjectId={setObjectId} sliderValue={sliderValue} setSliderValue={setSliderValue} isOpen={isOpen} onClose={onClose} />
                <MemoizedBottomBar />
                <TableOfContent geojsonLayer={geojsonLayer} />
                {generalLoading && <Loading />}
            </Suspense>
        </div>
    );
}

export default MapContainer