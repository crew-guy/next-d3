import { feature, mesh } from 'topojson'
import {json} from 'd3'

const useWorldAtlas = async () => {
    const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"

    const topojsonData = await json(jsonUrl)
    const {countries} = topojsonData.objects
    // console.log(topojsonData)

    return {
        countries: feature(topojsonData, countries),
        interiors : mesh(topojsonData, countries, (a,b)=> a!==b)
    }
}

export default useWorldAtlas
