import React from 'react'
import {useConfig} from '@contexts/ConfigContext'
import {AxisBottom} from '@components/AxisBottom'
import {AxisLeft} from '@components/AxisLeft'
import {Marks} from '@components/Marks'

const MarksAndAxes = () => {
    const config = useConfig()
    const {
        data,
        margin,
        filteredData,
        xVal,
        yVal,
        colorVal,
        xScale,
        yScale,
        colorScale,
        tooltipFormat,
        xAxisTickFormat,
        yAxisTickFormat,
        xAxisTickOffset,
        yAxisTickOffset,
        radiusCircle,
        innerHeight,
        innerWidth,
        hoveredValue,
        fadeOpacity
    } = config
    return (
        <g 
            height={innerHeight}
            width={innerWidth}
            transform={
            `translate(
                ${margin.left},
                ${margin.top}
                )`
            }
        >
            <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            xAxisTickFormat={xAxisTickFormat}
            xAxisTickOffset={xAxisTickOffset}
            />
            <AxisLeft
                yScale={yScale}
                innerWidth={innerWidth}
                yAxisTickFormat={yAxisTickFormat}
                yAxisTickOffset={yAxisTickOffset}
            />
            <g className="interactivity" opacity={hoveredValue ? fadeOpacity : 1}>
                <Marks
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    colorScale={colorScale}  
                    xVal={xVal}
                    yVal={yVal}
                    colorVal={colorVal}
                    tooltipFormat={tooltipFormat}
                    radiusCircle={radiusCircle}
                />
            </g>
            {hoveredValue && <Marks
                data={filteredData}
                xScale={xScale}
                yScale={yScale}
                colorScale={colorScale}  
                xVal={xVal}
                yVal={yVal}
                colorVal={colorVal}
                tooltipFormat={tooltipFormat}
                radiusCircle={radiusCircle}
            />}
        </g> 
    )
}

export default MarksAndAxes
