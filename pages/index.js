import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import * as d3 from 'd3'

export default function Home (props)
{
  console.log(props.data)
  console.log(`${props.text.length / 1024} kB`)
  console.log(`${props.data.length} rows`)
  console.log(`${props.data.columns.length} columns`)
  // console.log(`%c ${props.parsedData}`,'color:green');
  return (
    <div className={styles.container}>
      <h1>Next D3</h1>
    </div>
  )
}


export const getStaticProps = async() =>
{
  const csvUrl = "https://gist.githubusercontent.com/crew-guy/7cbac5e5cf2dbac4ab6a4c5e43e6f70d/raw/data.csv"
  
  //? M1 => Using d3.csvParse() function
  // const unParsedata = await fetch(csvUrl)
  // const text = await unParsedata.text()
  // const data = d3.csvParse(text)


  //? M2 => Using d3.csv()
  const data = await d3.csv(csvUrl)
  const text =  d3.csvFormat(data)

  return {
    props: {data, text}
  }
}
