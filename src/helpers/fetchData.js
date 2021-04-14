import {csvParse, csv, csvFormat} from 'd3'

export const fetchData = async () =>
{
    const csvUrl = "https://gist.githubusercontent.com/crew-guy/cd33a96418d10e1a520e87dbf8a3162f/raw/data.csv"
    const data = await csv(csvUrl)
    const text = csvFormat(data)
    return data
}
