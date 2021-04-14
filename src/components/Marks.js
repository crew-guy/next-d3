export const Marks = ({ yScale, xScale, xVal, yVal, data }) => (
    data.map(dataPoint =>
    {
        // console.log(dataPoint)
        console.log(xVal(dataPoint),yVal(dataPoint))
        return (
        <circle
            cx={xScale(xVal(dataPoint))}
            cy={yScale(yVal(dataPoint))}
            r={5}
        />
        )
    }
))
