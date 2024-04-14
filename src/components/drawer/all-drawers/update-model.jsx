import React, { useState } from 'react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Tooltip,
    Input
} from '@chakra-ui/react';
import "../../../styles/drawers/update-model.css"
import { useContext } from 'react';
import DrawerContext from '../../../context/drawer-context';
import LayerContext from '../../../context/layer-context';

const UpdateModel = ({objetId, setObjectId }) => {

    const {
        showTooltip,
        setShowTooltip,
        sliderValue,
        setSliderValue
    } = useContext(DrawerContext)
    const { data, setData } = useContext(LayerContext)

    const handleXChange = (newValue) => {
        // Yeni X değerini güncelle
        setSliderValue(prevState => ({
            ...prevState,
            x: newValue
        }));
        setData(prevData => {
            const newData = prevData.map(item => {
                if (item.id === objetId) { // id'si 2 olan elemanın X değerini güncelle
                    return { ...item, x: newValue };
                }
                return item;
            });
            return newData;
        });
    };


    const handleYChange = (newYValue) => {
        // Yeni X değerini güncelle
        setSliderValue(prevState => ({
            ...prevState,
            y: newYValue
        }));

        setData(prevData => {
            const newData = prevData.map(item => {
                if (item.id === objetId) { // id'si 2 olan elemanın X değerini güncelle
                    return { ...item, y: newYValue };
                }
                return item;
            });
            return newData;
        });
    };

    const handleZChange = (newValue) => {
        // Yeni Z değerini güncelle
        setSliderValue(prevState => ({
            ...prevState,
            z: newValue
        }));
        setData(prevData => {
            const newData = prevData.map(item => {
                if (item.id === objetId) { // id'si 2 olan elemanın X değerini güncelle
                    return { ...item, z: newValue };
                }
                return item;
            });
            return newData;
        });
    };

    const handleSizeChange = (newValue) => {
        console.log(newValue)
        setData(prevData => {
            const newData = prevData.map(item => {
                if (item.id === objetId) {
                    return { ...item, size: newValue };
                }
                return item;
            });
            return newData;
        });
    };

    return (
        <div className='update-model-content' >
            <div>
                <h1>Position - X :</h1>
                <Slider
                    id='slider'
                    defaultValue={sliderValue.x}
                    min={0}
                    max={360}
                    colorScheme='purple'
                    onChange={(v) => handleXChange(v)}
                    onMouseEnter={() => setShowTooltip({ ...showTooltip, x: true })}
                    onMouseLeave={() => setShowTooltip({ ...showTooltip, x: false })}
                >
                    <SliderMark value={90} mt='1' ml='-2.5' fontSize='sm'>
                        90
                    </SliderMark>
                    <SliderMark value={180} mt='1' ml='-2.5' fontSize='sm'>
                        180
                    </SliderMark>
                    <SliderMark value={270} mt='1' ml='-2.5' fontSize='sm'>
                        270
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                        hasArrow
                        bg='purple'
                        color='white'
                        placement='top'
                        isOpen={showTooltip.x}
                        label={`${sliderValue.x}`}
                    >
                        <SliderThumb />
                    </Tooltip>
                </Slider>
            </div>
            <div>
                <h1>Position - Y :</h1>
                <div>
                    <Slider
                        id='slider'
                        defaultValue={sliderValue.y}
                        min={0}
                        max={360}
                        colorScheme='purple'
                        onChange={(v) => handleYChange(v)}
                        onMouseEnter={() => setShowTooltip({ ...showTooltip, y: true })}
                        onMouseLeave={() => setShowTooltip({ ...showTooltip, y: false })}
                    >
                        <SliderMark value={90} mt='1' ml='-2.5' fontSize='sm'>
                            90
                        </SliderMark>
                        <SliderMark value={180} mt='1' ml='-2.5' fontSize='sm'>
                            180
                        </SliderMark>
                        <SliderMark value={270} mt='1' ml='-2.5' fontSize='sm'>
                            270
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                            hasArrow
                            bg='purple'
                            color='white'
                            placement='top'
                            isOpen={showTooltip.y}
                            label={`${sliderValue.y}`}
                        >
                            <SliderThumb />
                        </Tooltip>
                    </Slider>
                </div>
            </div>
            <div>
                <h1>Position - Z :</h1>
                <Slider
                    id='slider'
                    defaultValue={sliderValue.z}
                    min={0}
                    max={360}
                    colorScheme='purple'
                    onChange={(v) => handleZChange(v)}
                    onMouseEnter={() => setShowTooltip({ ...showTooltip, z: true })}
                    onMouseLeave={() => setShowTooltip({ ...showTooltip, z: false })}
                >
                    <SliderMark value={90} mt='1' ml='-2.5' fontSize='sm'>
                        90
                    </SliderMark>
                    <SliderMark value={180} mt='1' ml='-2.5' fontSize='sm'>
                        180
                    </SliderMark>
                    <SliderMark value={270} mt='1' ml='-2.5' fontSize='sm'>
                        270
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                        hasArrow
                        bg='purple'
                        color='white'
                        placement='top'
                        isOpen={showTooltip.z}
                        label={`${sliderValue.z}`}
                    >
                        <SliderThumb />
                    </Tooltip>
                </Slider>
            </div>
            <div>
                <h1>Size :</h1>
                <Slider
                    id='slider'
                    defaultValue={sliderValue.size}
                    min={0}
                    max={20}
                    colorScheme='purple'
                    onChange={(v) => handleSizeChange(v)}
                    onMouseEnter={() => setShowTooltip({ ...showTooltip, size: true })}
                    onMouseLeave={() => setShowTooltip({ ...showTooltip, size: false })}
                >
                    <SliderMark value={5} mt='1' ml='-2.5' fontSize='sm'>
                        5
                    </SliderMark>
                    <SliderMark value={10} mt='1' ml='-2.5' fontSize='sm'>
                        10
                    </SliderMark>
                    <SliderMark value={15} mt='1' ml='-2.5' fontSize='sm'>
                        15
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                        hasArrow
                        bg='purple'
                        color='white'
                        placement='top'
                        isOpen={showTooltip.size}
                        label={`${sliderValue.size}`}
                    >
                        <SliderThumb />
                    </Tooltip>
                </Slider>
            </div>
        </div>
    )
}

export default UpdateModel