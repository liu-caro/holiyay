import React, {Component} from "react";
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';
import Firebase from "./firebase";
import "firebase/storage";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./gallery.css";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageObjs: []
        };
    }

    componentDidMount(){
        /* Create reference to messages in Firebase Database */
        let imagesRef = Firebase.database().ref('images').orderByKey().limitToLast(100);
        imagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            this.setState({ imageObjs: [{original: snapshot.val().imageURL}].concat(this.state.imageObjs) });
            console.log(this.state.imageObjs);
        })

    }


    render() {
        return (
            <React.Fragment>
                 <ImageGallery items={this.state.imageObjs} />
             </React.Fragment>
         );
     }
}

export default Gallery;