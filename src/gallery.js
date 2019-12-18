import React, {Component} from "react";
import BackgroundSlideshow from 'react-background-slideshow';
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';


class Gallery extends Component {
    render() {
        return (
            <React.Fragment>
                <BackgroundSlideshow images={[ img1, img2, img3 ]}/>
            </React.Fragment>
        );
    }
}

export default Gallery;