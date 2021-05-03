export default function XAxisLabel({
    innerHeight,
    innerWidth,
    xAxisLabelOffset,
    xAxisLabel
})
{
    return (
        <text
            className="labels"
            x={innerWidth / 2}
            y={xAxisLabelOffset + innerHeight}
            textAnchor="middle"
        >
            {xAxisLabel}
        </text>
        )
}