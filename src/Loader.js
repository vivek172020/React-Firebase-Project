import React from 'react'
import loader from './Images/Spinner-1s-200px.gif'

export default function Loader() {
    return (
        <div>
            <img className='myloader' src={loader} />
        </div>
    )
}
