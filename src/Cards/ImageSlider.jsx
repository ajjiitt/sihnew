import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ImageSlider = () => {
    return (
        <div className='pt-4 ' >
            <Carousel >
                <div >
                    <img src="https://ndrf.gov.in/sites/default/files/Slider%202%20Banner%20Mixed%201500%C3%97500.png" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="https://ndrf.gov.in/sites/default/files/Slider%201.png" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src="https://ndrf.gov.in/sites/default/files/Slider%20Landslide_0.png" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </div>
    )
}

export default ImageSlider
