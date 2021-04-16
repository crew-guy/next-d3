import React from 'react'
import useSWR from 'swr'
import {csvParse} from 'd3'

export const useData = async () => {
    const csvUrl = "https://gist.githubusercontent.com/crew-guy/cd33a96418d10e1a520e87dbf8a3162f/raw/data.csv"
    

    // To obtain/manipulate certain parts of the response body
    // TODO : Fix this to include more fine grained responses
    // const fetcher = d => d
    // const {data, error} = useSWR(csvUrl, fetcher)
    // if (error)  { console.log('error occured'); return -1}
    // if (!data)  { console.log('data not found'); return 1}
    
    const unParsedData = await fetch(csvUrl)
    const text = await unParsedData.text()
    const data = csvParse(text)
    data.forEach(dataPoint =>
    {
        dataPoint.sepal_length = +dataPoint.sepal_length
        dataPoint.sepal_width = +dataPoint.sepal_width
        dataPoint.petal_width = +dataPoint.petal_width
        dataPoint.petal_length = +dataPoint.petal_length
    })

    return data
}

