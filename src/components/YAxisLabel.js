export const YAxisLabel = ({
    yAxisLabel,
    yAxisLabelOffset,
    innerHeight,
}) => (
    <text
        transform={`
        translate(
            ${-yAxisLabelOffset},
            ${innerHeight / 2})
            ,rotate(-90)`
        }
    >
        {yAxisLabel}
    </text>
)