import React from 'react'

export const Dropdown = ({attributes, setAttribute}) => {
    return (
        <>
            <label htmlFor='x-select'/>
            <select id="x-select" onChange={(e)=>setAttribute(e.target.value)} >
                    {attributes.map(({ label, value }) => (
                        <option value={value}>{label}</option>
                    ))}
            </select>
        </>
    )
}

