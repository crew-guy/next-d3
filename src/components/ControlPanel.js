import React from 'react'
//? REACT DROPDOWN
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import {useConfig} from '@contexts/ConfigContext'

//? USING CUSTOM BUILD DROPDOWN
// import {Dropdown} from '@components/Dropdown'

const ControlPanel = () =>
{
    const config = useConfig()
    const {
        attributes,
        setXAttribute,
        setYAttribute,
        currentX,
        currentY
    } = config
    const defaultOptionX = currentX;
    const defaultOptionY = currentY;
    return (
        <div className="c-panel"  >
        {/*<Dropdown 
          attributes={attributes} 
          setAttribute={setXAttribute}
        />
        <Dropdown 
          attributes={attributes} 
          setAttribute={setYAttribute}
        />*/}
        <Dropdown
          options={attributes}
          onChange={(attribute)=> setXAttribute(attribute) }
          value={defaultOptionX}
          placeholder="Select X"
        />
        <Dropdown
          options={attributes}
          onChange={(attribute)=> setYAttribute(attribute) }
          value={defaultOptionY}
          placeholder="Select Y"
        />
        {/* <ColorLegend data={data} colorScale={colorScale} colorVal={colorVal} />*/}
      </div>
    )
}

export default ControlPanel
