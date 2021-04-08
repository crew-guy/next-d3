export const AxisTop = ({xScale, innerHeight}) => (
    xScale.ticks().map(tickValue=>(
            <g transform={`translate(${xScale(tickValue)},0) `} >
                <line y2={innerHeight} stroke='black' />
                <text
                    key={tickValue}
                    style={{textAnchor:"middle"}}
                    dy='0.71em'
                    y={innerHeight}
                >{tickValue}</text>
            </g>
        ))
)