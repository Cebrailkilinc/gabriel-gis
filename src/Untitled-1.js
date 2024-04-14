import "./App.css";
/// app.js
import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer, GeoJsonLayer, PolygonLayer, TextLayer } from '@deck.gl/layers';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import Map, {
  Source,
  Layer,
  useControl,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import axios from "axios";
import { polygon, buffer } from '@turf/turf';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 38.25166,
  latitude: 37.74785,
  zoom: 13,
  pitch: 0,
  bearing: 0
};
import parsel18 from "./data/parsel18.json"

function App() {

  const [buildingControl, setBuildingControl] = useState({ lat: 38.25151, long: 37.74783 })
  const [mapController, setMapController] = useState(true)
  const [lines, setLines] = useState([]);

  const bufferedPolygon = buffer(polygon(parsel18.geometry.coordinates), -5, { units: 'meters' });


  useEffect(() => {
    const calculateDistances = () => {
      const newLines = [];
      const buildingCoords = [[buildingControl.lat - 5, buildingControl.long], [buildingControl.lat + 5, buildingControl.long], [buildingControl.lat, buildingControl.long - 5], [buildingControl.lat, buildingControl.long + 5]];
      buildingCoords.forEach((coord) => {
        const distance = Math.sqrt(
          Math.pow(coord[1] - buildingControl.lat, 2) +
          Math.pow(coord[0] - buildingControl.long, 2)
        );
        newLines.push({
          sourcePosition: [buildingControl.lat, buildingControl.long],
          targetPosition: coord,
          distance: distance
        });
        console.log(coord)
      });
      setLines(newLines);
    };

    calculateDistances();

    // Hareket esnasında uzaklıkları her an güncelleyin
  }, [buildingControl]);

const lineLayer = new LineLayer({
  id: 'line-layer',
  data: lines,
  getSourcePosition: [buildingControl.lat, buildingControl.long],
  getTargetPosition: [38.25166, 37.74785],
   
  getColor: d => [255, 0, 0],
  getWidth: 3
});
  // Kare GeoJSON verisini oluştur
  const squareGeojsonLayer = {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": bufferedPolygon
    },
    "properties": {}
  };


  const data2 = [
    { name: 'Colma (COLM)', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [38.25151, 37.74783] },
  ]

  const handleDragStart = event => {
    setMapController(false)
    setBuildingControl(prevState => {
      // Önceki state değerine dayalı olarak yeni bir state değeri oluşturun
      return { ...prevState, lat: event.coordinate[0], long: event.coordinate[1] };
    });

  };
  const handleDragStop = event => {
    setMapController(true)
    console.log("object")
  };

  const handleMapHover = (e) => {

  }

  const geojsonLayer = [
    new GeoJsonLayer({
      id: 'geojson-layer',
      data: parsel18,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 0.001,
      getFillColor: [255, 0, 0, 100],
      getLineColor: [0, 0, 0],
      pickable: true
    }),
    lineLayer,
    new TextLayer({
      id: 'text-layer',
      data: [{ text: '833/13', position: [38.25151, 37.74783] }],
      getSize: 15
    }),
    new ScenegraphLayer({
      id: 'scenegraph-layer',
      data: data2,
      pickable: true,
      scenegraph: 'Hotel.glb',
      getPosition: [buildingControl.lat, buildingControl.long],
      getOrientation: d => [0, 200, 90],
      sizeScale: 1,
      _lighting: 'pbr',
      onDrag: handleDragStart,
      onDragEnd: handleDragStop
    })
  ];






  return (
    <>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={mapController}
        layers={[geojsonLayer]}
        style={{ position: "fixed" }}
        onHover={handleMapHover}
      >
        <Map
          mapLib={import('mapbox-gl')}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14
          }}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} reuseMaps mapStyle={"mapbox://styles/mapbox/satellite-v9"} preventStyleDiffing={true}>

        </Map>

      </DeckGL>;
    </>
  );
}

export default App;
