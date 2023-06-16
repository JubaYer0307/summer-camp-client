import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/cool-background.png'
import img2 from './../../../../src/assets/p1.jpg'
import img3 from './../../../../src/assets/p8.jpg'


const Banner = () => {
    return (
        <Carousel>
                <div>
                    <img src={img1} />
                   
                </div>
                <div>
                    <img src={img2} />
               
                </div>
                <div>
                    <img src={img3} />
                    
                </div>
            </Carousel>
    );
};

export default Banner;