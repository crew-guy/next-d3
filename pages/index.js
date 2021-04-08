import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import * as d3 from 'd3'
import React,{useState, useEffect} from 'react'
    
export default function Home ({data,text})
{
  console.log(`${text.length / 1024} kB`)
  console.log(`${data.length} rows`)
  
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });
  
  const pieArc = d3.arc()
  .innerRadius(0)
  .outerRadius(width)
  
  const colorPie = d3.pie().value(1)

  return (
    <div className={styles.container}>
      <svg width={width} height={height}>
        <g transform={`translate(${width/2}, ${height/2})`} >
          
          //? Using d3.pie()
          {colorPie(data).map(d => (
            <path
              fill={d.data['Hex']}
              d={pieArc(d)}
            />

          ))}  
        
          
          //? Standard approach
          {/*props.data.map((d, i) => (
            <path
              fill={d['Hex']}
              d={pieArc({
              startAngle: (i/data.length)*2*Math.PI,
              endAngle: ((i+1)/data.length)*2*Math.PI
            })}/>
          ))*/}

          
        </g>  
      </svg>
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
