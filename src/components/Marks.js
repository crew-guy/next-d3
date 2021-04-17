export const Marks = ({
    xScale,
    yScale,
    xVal,
    yVal,
    data,
    tooltipFormat
}) =>
{
    return (
        <g className="marks">
            {data.map(dataPoint => (
                <g
                    className="mark"
                    transform={`translate(
                        ${xScale(xVal(dataPoint))},
                        ${yScale(yVal(dataPoint))}
                        ) `
                    }
                >
                    <circle
                        r={5}
                    />
                    <title>
                        {tooltipFormat(yVal(dataPoint))}
                    </title>
                </g>
            ) )}
        </g>
    )
}