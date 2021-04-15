export function xAxisLabel  ({labelX, labelY, xAxisLabelOffset}) {
return (
    <text
            x={labelY / 2}
            y={labelX + xAxisLabelOffset}
            textAnchor='middle'
            style={{ fontSize: '2.2rem' }}
            className='labels'
        >
            Petal Length
      </text>
  )
}