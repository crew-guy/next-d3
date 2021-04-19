export const YAxisLabel = ({
    yAxisLabel,
    yAxisLabelOffset,
    innerHeight,
}) => (
    <text
        className="label-text"
        transform={`
        translate(
            ${yAxisLabelOffset},
            ${innerHeight / 2})
            ,rotate(-90)`
        }
    >
        {yAxisLabel}
    </text>
)