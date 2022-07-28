import React from 'react'
import LoadinGif from '../images/Spinner.gif'

const Loader = () => {
  return (
    <div className="loader">
        <div className="loader_img">
            <img src={LoadinGif} alt="" className='loaderGif' />
        </div>
    </div>
  )
}

export default Loader