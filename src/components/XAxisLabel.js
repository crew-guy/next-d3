
export const XAxisLabel = ({
    xAxisLabel,
    xAxisLabelOffset,
    innerHeight,
    innerWidth
}) => (
    <text
        className="label-text"
        x={innerWidth/2}
        y={innerHeight + xAxisLabelOffset}
    >
        {xAxisLabel}
    </text>
)
