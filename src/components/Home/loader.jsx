import React from 'react'

export default function loader() {
  return (
    <div className='loaderContainer'>
        <img className="loader" src={process.env.REACT_APP_LOADER} alt="load"/>
        </div>
  )
}
