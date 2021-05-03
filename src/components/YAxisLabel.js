
export default function YAxisLabel  ({innerHeight, yAxisLabelOffset, yAxisLabel}) {
    return (
        <text
            className="labels"
            transform={
                `translate(
                    ${-yAxisLabelOffset},
                    ${innerHeight / 2}
                    ),
                rotate(-90)`
            }
        >
            {yAxisLabel}
        </text>
      )
    }
