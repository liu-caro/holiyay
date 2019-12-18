import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Stylesheets/Event.css'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button'
// import Octicon, { ArrowLeft } from '@primer/octicons-react'
import Firebase from './firebase'
import "firebase/storage";
import {Link} from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            progress: 0,
            imageURL: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        // console.log(Firebase.database().ref('events'));
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        Firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({ imageURL: url });
                console.log(this.state.imageURL);
            });
    };

    render() {

        return (
            <React.Fragment>

                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={Firebase.storage().ref("images")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                        {this.state.imageURL.length ? <img
                            src={this.state.imageURL}
                            alt="Uploaded Images"
                            height="300"
                            width="400"
                        /> : <div/>}
                        {console.log(this.state.imageURL)}




            </React.Fragment>
        );
    }
}

export default Upload;