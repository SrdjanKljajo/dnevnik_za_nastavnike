import React from 'react'

const Footer = () => {
    return (
        <div className="col text-center bg-dark py-2">
            <span className="text-light">
                &copy; Srdjan Kljajević - {new Date().getFullYear()}
            </span>
        </div>
    )
}

export default Footer