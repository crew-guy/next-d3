export default function AxisLeft ({yScale, innerWidth, yAxisTickOffset, tickFormat }) {
    return (
        <g className='y-axis-ticks'>
            { yScale.ticks().map((tickValue,i) => (
                <g
                    key={i}
                    className="ticks"
                    transform={`translate(0,${yScale(tickValue)})`}
                >
                    <line
                        x2={innerWidth}
                    />
                    <text
                        textAnchor="end"
                        dy="0.45em"
                        x={-yAxisTickOffset}
                    >
                        {tickFormat(tickValue)}
                    </text>
                </g>
            ) ) }
        </g>
    )
}