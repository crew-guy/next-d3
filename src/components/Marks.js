import {geoEqualEarth, geoNaturalEarth1, geoPath, geoGraticule } from 'd3'

// const projection = geoEqualEarth()
const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule() 

export default function Marks({countries, interiors})
{
    // console.log(countries)
    return (
        <g className="marks" >
            <path className="sphere" d={path({type:'Sphere'})}/>
            <path className="graticules" d={path(graticule())} />
            {countries.features.map(feature => (
                <path className="feature" d = {path(feature)}/>
            ))}
            {/*<path className="interior" d={path(interiors)}/>*/}
        </g>

      )
    }