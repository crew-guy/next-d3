import { csv } from 'd3'

const useCities = async () =>
{
    const csvUrl = "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/worldcities_clean.csv"

    const row = d =>
    {
        d.lat = +d.lat
        d.lng = +d.lng
        d.population = +d.population
        return d
    }

    const citiez = await csv(csvUrl, row)
    // console.log(cities)
    return citiez
}

export default useCities
