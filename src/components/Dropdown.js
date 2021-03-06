import React from 'react'

export const Dropdown = ({attributes, setAttribute}) => {
    return (
        <>
            <label htmlFor='x-select'/>
            <select id="x-select" onChange={(e) =>
                {setAttribute(
                        attributes.find(attribute =>
                        (
                            attribute.value === e.target.value
                        ))
                    )
                }}
            >
                {attributes.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                ))}
            </select>
        </>
    )
}

