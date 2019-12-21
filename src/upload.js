import React, { Component } from 'react';
import Firebase from './firebase'
import "firebase/storage";
import "firebase/database";
// import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import {Button, FormControl, FormLabel, Textarea, Flex, Text} from "@chakra-ui/core";
import "./App.css";
import "./theme";
import Box from "@chakra-ui/core/dist/Box";


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            progress: 0,
            imageUrl: '',
            caption: ''
        };
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                this.setState({ imageUrl: url });
                console.log(this.state.imageUrl);
            });
    };

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = Firebase.database().ref('images' );
        const item = {
            imageURL: this.state.imageUrl,
            caption: this.state.caption
        };
        itemsRef.push(item);
        this.setState({
            imageUrl: '',
            caption:''
        });
    }

    render() {

        const handleChange = e => this.setState({
            [e.target.id]: e.target.value
        });

        let urlExists = this.state.imageUrl.length;

        return (


            <React.Fragment>
                <Text textAlign="center" fontSize="3xl" mb={5}> Upload your <span>Holiday Photos</span></Text>
                <form onSubmit={this.handleSubmit}>
                <Flex width="100%" align="center" justify="center" textAlign="center">
                    <CustomUploadButton
                        classname="upload-button"
                        accept="image/*"
                        randomizeFilename
                        storageRef={Firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}>
                        Choose File
                    </CustomUploadButton>
                </Flex>
                    <Box maxW = "95%">

                    {this.state.imageUrl.length ? <img
                        src={this.state.imageUrl}
                        alt="Uploaded Images"
                        height="300"
                        width="400"
                    /> : <div/>}
                    {console.log(this.state.imageUrl)}

                    <FormControl>
                        <FormLabel m={2} mt={4} htmlFor="caption">Share any holiday greetings or why this photo makes your cheerful! (Optional)</FormLabel>
                        <Textarea m={2} onChange={handleChange} type="text" name="caption" id="caption" aria-describedby="caption" />
                    </FormControl>
                    </Box>
                <Flex align="center" justify="center" textAlign="center">
                    <Button
                        mt={10}
                        variantColor="green"
                        size="lg"
                        isDisabled={!urlExists}
                        type="submit">
                        Submit
                    </Button>
                </Flex>
                </form>

            </React.Fragment>
        );
    }
}

export default Upload;