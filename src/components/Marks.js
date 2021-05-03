
export const Marks = ({
    xScale,
    yScale,
    colorScale,
    xVal,
    yVal,
    colorVal,
    data,
    tooltipFormat,
    radiusCircle
}) =>
{
    return (
        <g className="marks">
            {data.map((dataPoint,i) => (
                <g
                    key={i}
                    className="mark"
                    transform={`translate(
                        ${xScale(xVal(dataPoint))},
                        ${yScale(yVal(dataPoint))}
                        ) `
                    }
                >
                    <circle
                        r={radiusCircle}
                        fill={colorScale(colorVal(dataPoint))}
                    />
                    <title>
                        {tooltipFormat(yVal(dataPoint))}
                    </title>
                </g>
            ) )}
        </g>
    )
}

