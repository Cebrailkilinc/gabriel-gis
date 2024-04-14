import React from 'react'
import "../../styles/hoverCoordinate.css"
const HoverCoordinate = ({hoverCoordinate}) => {
  return (
    <div className='hoverCoordinate-container' >
        <h1>lat : {hoverCoordinate && hoverCoordinate.lat.toFixed(4)}</h1>
        <h1>lng : {hoverCoordinate && hoverCoordinate.long.toFixed(4)}</h1>
        <h1>Wgs-84</h1>
    </div>
  )
}

export default HoverCoordinate