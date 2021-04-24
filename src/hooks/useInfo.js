import { csv } from 'd3'

const useInfo = async () =>
{
    // const csvUrl = "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/worlddata_clean.csv"
    const csvUrl = "https://gist.githubusercontent.com/crew-guy/0292365a8e37d4c34224a4557bc71ade/raw/dataset.csv"

    const row = d =>
    {
        d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse()
        d['Total Dead and Missing'] = +d['Total Dead and Missing']
        d['Reported Date'] = (new Date(d['Reported Date'] )).toJSON()
        return d
    }

    try {
        const data = await csv(csvUrl, row)
        console.log(data[0])
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export default useInfo
