import * as d3 from 'd3'
import {feature, mesh} from 'topojson'

export const fetchData = async () =>
{
    const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"

    const topojsonData = await d3.json(jsonUrl)
    const { countries } = topojsonData.objects
    

    return ({
        countries : feature(topojsonData, countries),
        interiors : mesh(topojsonData, countries, (a,b)=> a!==b)
    })
}