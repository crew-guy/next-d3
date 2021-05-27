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


## Configuration context

### Snippet

- This file simply contains all direct numerical configurations

    ```jsx
    // MARGIN
    export const MARGIN = {
        top: 60,
        left: 100,
        bottom: 150,
        right: 300,
    }

    // LABELS
    export const X_AXIS_LABEL_OFFSET = 120
    export const Y_AXIS_LABEL_OFFSET = 40

    // MARKS
    export const RADIUS_CIRCLE = 12

    // TICKS
    export const X_AXIS_TICK_OFFSET = 8
    export const Y_AXIS_TICK_OFFSET = 8

    // LEGEND
    export const COLOR_ARRAY = ['#E6842A', '#137B80', '#8E6C8A']
    export const TICK_SPACING = 32
    export const TICK_TEXT_OFFSET = 20

    export const LEGEND_X_OFFSET = 130
    export const LEGEND_Y_OFFSET = 250

    // INTERACTIVITY
    export const FADE_OPACITY = 0.2
    ```

- This file is the Context for the entire plot and exposes a hook to use the context as well

    ```tsx
    import React, { useState, useEffect, useContext } from 'react'
    // import fetchData from '@helpers/fetchData'
    import {scaleLinear, max, extent, scaleOrdinal} from 'd3'
    import {useData} from '@hooks/useData'
    import { attributes } from '@helpers/attributes'
    import
        {
            MARGIN,
            X_AXIS_LABEL_OFFSET,
            Y_AXIS_LABEL_OFFSET,
            RADIUS_CIRCLE,
            X_AXIS_TICK_OFFSET,
            Y_AXIS_TICK_OFFSET,
            COLOR_ARRAY,
            TICK_TEXT_OFFSET,
            TICK_SPACING,
            LEGEND_X_OFFSET,
            LEGEND_Y_OFFSET,
            FADE_OPACITY
        } from '@helpers/configValues'

    const ConfigContext = React.createContext()

    export const useConfig = () => useContext(ConfigContext)

    const ConfigProvider = ({ children }) =>
    {
        const config = {}
        const [data, setData] = useState([])
        const [height, setHeight] = useState(0)
        const [width, setWidth] = useState(0)

        //* FOR HOVER INTERACTIVITY OF MARKS
        const [hoveredValue, setHoveredValue] = useState(null)
        config.hoveredValue = hoveredValue
        config.setHoveredValue = setHoveredValue

        useEffect( () =>
        {
            (async () => {
                const temp = await useData()
                setData(temp)
                setHeight(window.innerHeight)
                setWidth(window.innerWidth)
            })()
            // console.log(data)
        }, [])

        config.margin = MARGIN

        // console.log(data)
        config.data = data
        // console.log(config.data)

        //* ATTRIBUTES
        const currentX = attributes[0]
        const currentY = attributes[1]

        config.currentX = currentX
        config.currentY = currentY

        const [xAttribute, setXAttribute] = useState(currentX)
        const [yAttribute, setYAttribute] = useState(currentY)
        
        config.setXAttribute = setXAttribute
        config.setYAttribute = setYAttribute

        config.attributes = attributes

        config.xVal = d => d[xAttribute.value]
        config.yVal = d => d[yAttribute.value]
        config.colorVal = d => d.species

        //* FOR DATA INTERACTIVITY ON HOVER
        config.filteredData = data.filter(d => hoveredValue === config.colorVal(d))

        // console.log(config.xVal)

        //* HEIGHTS AND WIDTHS
        config.height = height
        config.width = width
        config.innerWidth = width - config.margin.left - config.margin.right
        config.innerHeight = height - config.margin.top - config.margin.bottom

        
        //* SCALES
        config.xScale = scaleLinear()
            // .domain(extent(data, config.xVal))
            .domain(extent(data,config.xVal))
            .range([0,config.innerWidth])
            .nice()

        config.yScale = scaleLinear()
            // .domain(extent(data, config.yVal))
            .domain([0,max(data,config.yVal)])
            .range([config.innerHeight, 0])
        
        config.colorScale = scaleOrdinal()
            .domain(data.map(config.colorVal))
            .range(COLOR_ARRAY)

        //* TICKS AND TOOLTIPS
        config.xAxisTickOffset = X_AXIS_TICK_OFFSET
        config.yAxisTickOffset = Y_AXIS_TICK_OFFSET
        config.tooltipFormat = d => d
        config.xAxisTickFormat = d => d
        config.yAxisTickFormat = d => d

        //* LABELS
        config.xAxisLabel = xAttribute.label
        config.yAxisLabel = yAttribute.label
        config.xAxisLabelOffset = X_AXIS_LABEL_OFFSET
        config.yAxisLabelOffset = Y_AXIS_LABEL_OFFSET

        //* MARKS
        config.radiusCircle = RADIUS_CIRCLE

        //* LEGEND
        config.legendXOffset = LEGEND_X_OFFSET
        config.legendYOffset = LEGEND_Y_OFFSET
        config.tickSpacing = TICK_SPACING
        config.tickTextOffset = TICK_TEXT_OFFSET

        //* INTERACTIVITY
        config.fadeOpacity = FADE_OPACITY
        
        return (
            <ConfigContext.Provider value={config} >
                {children}
            </ConfigContext.Provider>
        )
    }

    export default ConfigProvider
    ```

Be sure to wrap the provider around the components in the root file

- After all this, your App file becomes this simple

    ```tsx
    import AxesLabels from '@components/AxesLabels'
    import MarksAndAxes from '@components/MarksAndAxes'
    import ControlPanel from '@components/ControlPanel'
    import Legend from '@components/Legend'

    const Home = () =>
    {
      const config = useConfig()

      const {
        height,
        width,
      } = config

      return (
        <>
          <ControlPanel/>
        <svg
          height={height}
          width={width}
        >
          <Legend/>  
          <MarksAndAxes/>
          <AxesLabels/>        
        </svg>
      </>
      )
    }

    ```

- Say now we wish to deal with ControlPanel to change X and Y 
coordinates

    ```tsx
    import React from 'react'
    //? REACT DROPDOWN
    import Dropdown from 'react-dropdown'
    import 'react-dropdown/style.css';
    import {useConfig} from '@contexts/ConfigContext'

    //? USING CUSTOM BUILD DROPDOWN
    // import {Dropdown} from '@components/Dropdown'

    const ControlPanel = () =>
    {
        const config = useConfig()
        const {
            attributes,
            setXAttribute,
            setYAttribute,
            currentX,
            currentY
        } = config
        const defaultOptionX = currentX;
        const defaultOptionY = currentY;
        return (
            <div className="c-panel"  >
            {/*<Dropdown 
              attributes={attributes} 
              setAttribute={setXAttribute}
            />
            <Dropdown 
              attributes={attributes} 
              setAttribute={setYAttribute}
            />*/}
            <Dropdown
              options={attributes}
              onChange={(attribute)=> setXAttribute(attribute) }
              value={defaultOptionX}
              placeholder="Select X"
            />
            <Dropdown
              options={attributes}
              onChange={(attribute)=> setYAttribute(attribute) }
              value={defaultOptionY}
              placeholder="Select Y"
            />
            {/* <ColorLegend data={data} colorScale={colorScale} colorVal={colorVal} />*/}
          </div>
        )
    }

    export default ControlPanel

    ```


## Binned aggregation

### Snippet

Basically, here, I have aggregated the total number of dead people by month and set the yScale to have the total deaths sum as the marks

New d3 functions used here are bin(earlier known as histogram)

```jsx
import {bin, scaleLinear, max, timeMonths, sum} from 'd3'

const [start, stop] = xScale.domain()

// Binned data simpy takes all the cases of people dying between start and end date and groups each such case as an object, into a collective array which contains => x no. of case objects, start date, end data  
// So basically, if say we have 48 months, binned data is an array of 48 arrays where each of the 48 arrays has 3 things :
// 1. Start date (eg : Jan 1st)
// 2. End data (eg : Feb 1st, cause we are binning by month)
// 3. Individual case objects 

// **binnedData = [**
//		**[**
//       **x0 = .....** -> start date of bin
//       **x1 = .....** -> end date (i.e. start date + 1 month) of bin
//       **{**
//          **totalDead = .....**
//          **{...someOtherCaseRelatedInfo(eg : geo-coordinates)}**
//       **}**  -> a case object
//       **{},{}** -> more case objects
//    **]** -> a month array
// **]**

const binnedData = bin()
    .value(xVal)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))
		(data)

// Summed binned data just looks into the binned data array's case objects, extracts the number of deaths that occured on each timestamp and sums it up as a single number to use as our y coordinate
// Also, we rawly extract the start (x0) and end (x1) from each of the month array
// Eg, we have 48 months' binnedData
// summedBinnedData will be an array of 48 object where each object will have 3 things :
// 1. Start date (eg : Jan 1st)
// 2. End date (eg : Feb 1st, cause in binnedData, we were binning by month)
// 3. y = just a sum obtained by extracting the number of deaths from each case object and summing this metric across all case objects in a month array

// **summedBinnedData = [
//    {  
//       x0 = ...** -> start date of bin (eg : Jan 1st)
**//       x1 = ....** -> end date of bin (eg : Feb 1st (start date + 1 month ))
**//		   y = ....** -> sum of deaths in a month (eg : between Jan 1st and Feb 1st)
//    **}
// ]**

const summedBinnedData = binnedData

    .map(array => ({
      y: sum(array, yVal),
      x0: array.x0,
      x1:array.x1
    }))

// Gotta redefine yScale based on sums calculated in binnedData
const yScale = scaleLinear()
  .domain([0, max(summedBinnedData, d => d.y)])
  .range([innerHeight,0])
```

## Rendering the bins using SVG rectangle

Just gotta set height and width based on updated yscale

```jsx
export default function Marks({
    binnedData,
    xScale,
    yScale,
    tooltipFormat,
    innerHeight
})
{
    return (
        <g className="marks" >
            {binnedData.map((dataPoint,i) => (
                <g key={i} className="mark">
                    <rect
                        x={xScale(dataPoint.x0)}
                        y={yScale(dataPoint.y)}
                        width={xScale(dataPoint.x1) - xScale(dataPoint.x0)}
                        height={innerHeight-yScale(dataPoint.y)}
                    />
                    <title>{tooltipFormat(dataPoint.y)} </title>
                </g>
                )  )}
        </g>

      )
    }
```
