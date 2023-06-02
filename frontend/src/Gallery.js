import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './Gallery.css';

//Image Imports
var images2023 = [
    './img/2023/img2.jpg',
    './img/2023/img3.jpg',
    './img/2023/img4.jpg',
    './img/2023/img5.jpg',
    './img/2023/img6.jpg',
    './img/2023/img7.jpg',
    './img/2023/img8.jpg',
    './img/2023/img9.jpg',
    './img/2023/img10.jpg',
    './img/2023/img11.jpg',
    './img/2023/img12.jpg',
    './img/2023/img13.jpg',
    './img/2023/img14.jpg',
    './img/2023/img15.jpg',
    './img/2023/img16.jpg',
    './img/2023/img17.jpg',
    './img/2023/img18.jpg',
    './img/2023/img19.jpg',
    './img/2023/img20.jpg',
    './img/2023/img21.jpg',
    './img/2023/img22.jpg',
    './img/2023/img23.jpg',
]



function Gallery() {
  return (
    <div className='container'>
        <div className='info-container'>
            <h2>7429 2023 Photos</h2>
        </div>

        <div className='gallery-container'>
            <Carousel indicators={false} variant='dark' >
                {images2023.map((image, index)=> {
                    return(
                        <Carousel.Item>
                            <img className='imgs' src={image}/>
                        </Carousel.Item>
                    )
                })
                }
            </Carousel>
        </div>


        <br/>
    </div>
  )
}

export default Gallery