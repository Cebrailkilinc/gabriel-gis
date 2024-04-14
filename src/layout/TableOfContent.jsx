import React from 'react'
import "../styles/tableOfContent.css"
const TableOfContent = ({geojsonLayer}) => {

    console.log(geojsonLayer)
    return (
        <div className='table-of-content-container' >
           <h1 className='table-of-content-container-header'  >Table Of Content</h1>
           {
            geojsonLayer.map((item,i)=>(
                
                <h1 key={i}>{item.id}</h1>
            ))
           }
        </div>
    )
}

export default TableOfContent