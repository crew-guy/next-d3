import React from 'react'
import {useConfig} from '@contexts/ConfigContext'
import {ColorLegend} from '@components/ColorLegend'

const Legend = () =>
{
    const config = useConfig()
    const {
        legendXOffset,
        legendYOffset,
        innerHeight,
        innerWidth,
    } = config

    return (
        <g className="ticks" transform={`translate(${innerWidth +legendXOffset}, ${innerHeight/2 - legendYOffset})`} >
            <text
                className="label-text"
                transform={`translate(0, -30)`}
            >
                Species
            </text>
            <ColorLegend/>
      </g>
    )
}

export default Legend
