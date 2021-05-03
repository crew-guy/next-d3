import React from 'react'
import {XAxisLabel} from "@components/XAxisLabel"
import { YAxisLabel } from '@components/YAxisLabel'
import { useConfig } from "@contexts/ConfigContext"


const AxesLabels = () => {
    const config = useConfig()
    const {
        innerHeight,
        innerWidth,
        xAxisLabel,
        yAxisLabel,
        xAxisLabelOffset,
        yAxisLabelOffset,    
    } = config
    return (
        <>
        <XAxisLabel
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            xAxisLabel={xAxisLabel}
            xAxisLabelOffset={xAxisLabelOffset}
        />
        <YAxisLabel
            innerHeight={innerHeight}
            yAxisLabel={yAxisLabel}
            yAxisLabelOffset={yAxisLabelOffset}
        />
        </>
    )
}

export default AxesLabels
