import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3-geo'
import React,{useState, useEffect} from 'react'

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

const Marks = ({ data, sizeScale, sizeValue }) =>
{
    // console.log(data)
    const [loading, setLoading] = useState(true)
    useEffect(() =>
    {
        setLoading(data === undefined)
    },[data])
    
    return (
        <g className="marks" >
            {loading
                ? <text>loading....</text> 
                : 
                <>
                    <path className="sphere" d={path({ type: 'Sphere' })} />
                    <path className="graticules" d={path(graticule())} />
                    {data && data.countries.features.map((feature,i) => (
                        <path key={i} className="land" d={path(feature)} />
                    ))}
                    <path className="interiors" d={path(data.interiors)} />
                    {data.info.map((d,i) =>
                    {
                        const [x, y] = projection(d.coords)
                        return (
                            <circle key={i} className="city" cx={x} cy={y} r={sizeScale(sizeValue(d))}/>
                        )
                    })}
                </>
            }
        </g>
    )
}

export default Marks
