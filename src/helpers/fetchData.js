import * as d3 from 'd3'

export const fetchData = async () =>
{
    const csvUrl = "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/week_temperature_sf.csv"
    const row = (d) =>
    {
        d.temperature = +d.temperature
        d.timestamp = new Date(d.timestamp)
        return d
    }

    const data = await d3.csv(csvUrl,row)
    return data
}