import {curveCardinal, curveStep, line } from 'd3'

export default function Marks({ data, xScale, yScale, xVal, yVal, tooltipFormat, radiusCircle })
{
    return (
        <g className="marks" >
            <path
                d={
                    line()
                        .x(d => xScale(xVal(d)))
                        .y(d => yScale(yVal(d)))
                        .curve(curveCardinal)
                        (data)
                }
            />
            {data.map(dataPoint => (
                <g className="mark">
                    <circle
                    cx={xScale(xVal(dataPoint))}
                    cy={yScale(yVal(dataPoint))}
                    r={radiusCircle}
                    />
                    <title>{tooltipFormat(yVal(dataPoint))} </title>
                </g>
                )  )}
        </g>

      )
    }