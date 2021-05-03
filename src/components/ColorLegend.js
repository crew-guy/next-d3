import React from 'react'
import {useConfig} from '@contexts/ConfigContext'

export const ColorLegend = () =>
{
    const config = useConfig()
    const {
        data,
        colorVal,
        colorScale,
        tickSpacing,
        tickTextOffset,
        radiusCircle,
        setHoveredValue,
        hoveredValue,
        fadeOpacity
    } = config

    //? My approach
    // const allSpecies = (data.map(colorVal))
    // const uniqueSpecies = allSpecies.filter((v, i, a) => a.indexOf(v) === i); 
    // const allColors = data.map(d => colorScale(colorVal(d)))
    // const uniqueColors = allColors.filter((v, i, a) => a.indexOf(v) === i)

    // //! Alternatively, could have used the domain on the color scale for unique values
    // // const uniqueSpecies = colorScale.domain()
    // // const uniqueColors = uniqueSpecies.map(domainValue = colorScale(domainValue) )  

    // return (
    //     <>
    //         <h3>Legend => </h3>
    //         <ul className="legend" >
    //             {uniqueSpecies.map((species, i) => (
    //                 <li className="legend-item">
    //                     <div className="color-legend-div" style={{ background:`${uniqueColors[i]}` }} />
    //                     <span className="legend-text">{species}</span>
    //                 </li>
    //             ))}
    //         </ul>
    //     </>
    // )


    //? Teacher's approach
    return colorScale.domain().map((domainValue,i) => (
        <g
            className="legend-item-alternate interactivity"
            key={i}
            transform={`translate(0,${i * tickSpacing})`}
            opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
        >
            <circle
                fill={colorScale(domainValue)}
                r={radiusCircle}
                onMouseEnter={() =>setHoveredValue(domainValue)}
                onMouseOut={()=>setHoveredValue(null)}
            />
            <text style={{cursor:"default"}} transform={`translate(${tickTextOffset},5)`} >
                {domainValue}
            </text>
        </g>
    ))

}

