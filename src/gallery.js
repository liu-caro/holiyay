import React, {Component} from "react";
import BackgroundSlideshow from 'react-background-slideshow';
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';
import Firebase from "./firebase";
import "firebase/storage";


class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageObjs: [],
            // images: []
        };
    }

    componentDidMount(){
        /* Create reference to messages in Firebase Database */
        let imagesRef = Firebase.database().ref('images').orderByKey().limitToLast(100);
        imagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            // let imageObj = { text: snapshot.val(), id: snapshot.key };
            this.setState({ imageObjs: [snapshot.val().imageURL].concat(this.state.imageObjs) });
            console.log(this.state.imageObjs);
            // this.setState({ images: [imageObj.text.URL].concat(this.state.images) });
        })
    }

    populateImages(){
        let images = [];
       // return this.state.imageObjs.map( imageRef =>
       //     let images2 = <img src={imageRef.text.imageUrl || "https://via.placeholder.com/1280x850"} alt="holidayImage" />
       //
       //     );
    }



    render() {


        return (
            <React.Fragment>


                <BackgroundSlideshow images={this.state.imageObjs}/>
            </React.Fragment>
        );
    }
}

export default Gallery;