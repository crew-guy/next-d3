export const Marks = ({ yScale, xScale, xVal, yVal, data,tooltipFormat,circleRadius }) => (
    <g className="marks">
        {data.map(dataPoint =>(
            <>
                <circle
                    className="mark"
                    cx={xScale(xVal(dataPoint))}
                    cy={yScale(yVal(dataPoint))}
                    r={circleRadius}
                />
                <title>{tooltipFormat(xVal(dataPoint))}</title>
            </>
        ))}
    </g>
)
