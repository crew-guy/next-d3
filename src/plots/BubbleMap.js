import MapMarks from '@components/MapMarks'
import { useConfig } from '@contexts/ConfigContext'

import React from 'react'

const BubbleMap = () =>
{
    const config = useConfig()
    // console.log(config)
    const {
      data,
      sizeScale,
      sizeValue
    } = config
  
    return (
        <MapMarks
            data={data}
            sizeScale={sizeScale}
            sizeValue={sizeValue}
          />
    )
}

export default BubbleMap
