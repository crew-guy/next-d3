export const Marks = ({yScale,xScale }) =>
(
    yScale.ticks().map(tickValue => (
        <g>
            <circle
                cx={xScale(tickValue)}
                cy={yScale(tickValue)}
                r={5}
            />
            <title>{ yScale(tickValue)}</title>
        </g>
    ))
)