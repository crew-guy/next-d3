export const Marks = ({data, xScale, yScale, xVal, yVal, toolTipFormat}) => (
    data.map(d =>
    {
        console.log(xVal(d))
        return (
            <g>
                <rect className="mark"
                    key={yVal(d)}
                    x={0}
                    y={yScale(yVal(d))}
                    width={xScale(xVal(d))}
                    height={yScale.bandwidth()}
                />
                <title>{toolTipFormat(xVal(d))}</title>
            </g>
        )
    })
)