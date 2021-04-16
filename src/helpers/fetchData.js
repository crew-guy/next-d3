import {csvParse, csv, csvFormat} from 'd3'

export const fetchData = async () =>
{
    const row = d => {
        d.sepal_length = +d.sepal_length,
        d.sepal_width = +d.sepal_width,
        d.petal_width = +d.petal_width,
        d.petal_length = +d.petal_length
    }
    const csvUrl = "https://gist.githubusercontent.com/crew-guy/cd33a96418d10e1a520e87dbf8a3162f/raw/data.csv"
    // const data = await csv(csvUrl,row)
    const data = await csv(csvUrl)
    const text = await csvFormat(data)
    return data
}

export default fetchData