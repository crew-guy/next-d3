import * as d3 from 'd3'

export const fetchData = async () =>
{
    const csvUrl = "https://gist.githubusercontent.com/crew-guy/0292365a8e37d4c34224a4557bc71ade/raw/dataset.csv"
    const row = (d) =>
    {
        d['Total Dead and Missing'] = +d['Total Dead and Missing']
        d['Reported Date'] = new Date(d['Reported Date'])
        return d
    }

    const data = await d3.csv(csvUrl, row)
    console.log(data[0])
    return data
}