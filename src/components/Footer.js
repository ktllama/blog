import React from 'react'

export const Footer = ({ length }) => {

    return (
        <footer>
            <p>{length} list { length === 1 ? "item" : "items" }</p>
        </footer>
    )
}


