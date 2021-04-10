export const Marks = ({data, xScale, yScale, xVal, yVal}) => (
    data.map(d => (
        <rect className="mark"
            key={yVal(d)}
            x={0}
            y={yScale(yVal(d))}
            width={xScale(xVal(d))}
            height={yScale.bandwidth()}
        />
    ))
)