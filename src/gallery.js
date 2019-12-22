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
        let imagesRef = Firebase.database().ref('images').orderByKey();
        // imagesRef.on('child_added', snapshot => {
        imagesRef.on("value", snapshot => {
            /* Update React state when message is added at Firebase Database */
            console.log(snapshot.val());
            let data = snapshot.val();
            let images = [];
            Object.keys(data).forEach(function(key) {
                images.push({original: data[key].imageURL, description:data[key].caption});
            });
            this.setState({imageObjs: images});
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