## Margins and Axes

Basically, we use from d3, the :

**scaleLinear = ticks = X**

**scaleBand** **=** **domain = Y**

Here, xScale, yScale and innerHeight are defined as

### Logic for margin = cut off margins from a stipulated width and then transform translate the box inside the main component

```jsx
	const [height, setHeight] = useState(0)
	const [width, setWidth] = useState(0)
	
	  useEffect(()=>{
	    setHeight(window.innerHeight-100)
	    setWidth(window.innerWidth-100)
	  },[])
	
	  const margin = {top:40, left:300, right:40, bottom:100}
	  const innerWidth = width - margin.left - margin.right
	  const innerHeight = height - margin.top - margin.bottom
	
	  const xVal = d => d.Population
	  const yVal = d => d.Country
	
		// Mapped over dataset instead of providing number range as y-values are country names which have a categorical and not a discretely ordered form
	  const yScale = scaleBand()
	      .domain(data.map(yVal))
	      .range([0,innerHeight])
	      .padding(0.2)
	
		// max function of d3 will take into account each mapping of the data and passed it to the xVal function
	  const xScale = scaleLinear()
	      .domain([0, max(data,xVal)])
	      .range([0, innerWidth])
	  
	  
	  const xAxisLabelOffset = 80
	  const siFormat = format(".2s");
	  const tickFormat = tickFormat => siFormat(tickFormat).replace('G','B')
```

### Logic for axes ( SVG = line (x1, y1, x2, y2) + text (style, dy, y, x, dx, textAnchor in style) )

```jsx
export const AxisTop = ({xScale, innerHeight, tickFormat}) => (
    xScale.ticks().map(tickValue=>(
						// Here, translate sets up the x1 and y1 values
            <g className="tick" transform={`translate(${xScale(tickValue)},0) `} >
                <line y2={innerHeight} />
                <text
                    key={tickValue}
                    style={{textAnchor:"middle"}}
                    dy='0.71em'
                    y={innerHeight}
                >{tickFormat(tickValue*1000)}</text>
            </g>
    ))
)
```

```jsx
export const AxisBottom = ({yScale}) => (
    yScale.domain().map(tickValue=>(
        <g className="tick">
            <text
            key={tickValue}
            x={-3}
            style={{textAnchor: 'end'}}
            dy="0.32em"
            y={yScale(tickValue) + yScale.bandwidth()/2}
            >
            {tickValue}
            </text>
        </g>
    ))
)
```

## Rendering chart

### Snippet

Integrating 3 things :

1. fetched data
2. marks
3. axes

```jsx
import {useState, useEffect} from 'react'
import {scaleLinear, scaleBand, max, format} from 'd3'
import {AxisTop} from '@components/AxisTop'
import {AxisBottom} from '@components/AxisBottom'
import {Marks} from '@components/Marks'
import {fetchData} from '@helpers/fetchData'

export default function Home({data}) {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(()=>{
    setHeight(window.innerHeight-100)
    setWidth(window.innerWidth-100)
  },[])

  const margin = {top:40, left:300, right:40, bottom:100}
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xVal = d => d.Population
  const yVal = d => d.Country

  const yScale = scaleBand()
      .domain(data.map(yVal))
      .range([0,innerHeight])
      .padding(0.2)

  const xScale = scaleLinear()
      .domain([0, max(data,xVal)])
      .range([0, innerWidth])
  
  
  const xAxisLabelOffset = 80
  const siFormat = format(".2s");
  const tickFormat = tickFormat => siFormat(tickFormat).replace('G','B')
  

	// Rendering chart
  return (
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`} >
            <AxisTop xScale={xScale} innerHeight={innerHeight} tickFormat={tickFormat} />
            <AxisBottom yScale={yScale}/>
						<Marks data={data} xScale={xScale} yScale={yScale} xVal={xVal} yVal={yVal} />
            <text
              className="axis-label"
              x={innerWidth / 2}
              textAnchor='center'
              y={innerHeight + xAxisLabelOffset}
            >Population</text>
          </g>
        </svg>
)}

// Fetching data
export const getStaticProps = async () => {
  const data = await fetchData()
  console.log(data)
  return {
    props:{
      data
    }
  }
}
```


