import React, { Component } from 'react';
import Firebase from './firebase'
import "firebase/storage";
import "firebase/database";
// import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import Button from "@chakra-ui/core/dist/Button";
import FormControl from "@chakra-ui/core/dist/FormControl";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import Input from "@chakra-ui/core/dist/Input";
import FormHelperText from "@chakra-ui/core/dist/FormHelperText";


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            progress: 0,
            imageURL: '',
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
                this.setState({ imageURL: url });
                console.log(this.state.imageURL);
            });
    };

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = Firebase.database().ref('images' );
        const item = {
            imageURL: this.state.imageURL,
            caption: this.state.caption
        };
        itemsRef.push(item);
        this.setState({
            caption:''

        });
    }

    render() {

        const handleChange = e => this.setState({
            [e.target.id]: e.target.value
        });


        return (
            <React.Fragment>

                <form onSubmit={this.handleSubmit}>
                    <FormControl>
                        <FormLabel htmlFor="caption">Caption</FormLabel>
                        <FormHelperText id="caption-helper-text">
                            {/*Share why this photo makes you cheerful!*/}
                        </FormHelperText>
                        <Input onChange={handleChange} type="text" name="caption" id="caption" aria-describedby="caption" />
                    </FormControl>

                    <Button
                        mt={4}
                        variantColor="teal"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>

                        <CustomUploadButton
                            accept="image/*"
                            randomizeFilename
                            storageRef={Firebase.storage().ref("images")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            style={{backgroundColor: 'steelblue', color: 'white', padding: 10, margin: 50, borderRadius: 4}}>
                            Upload your holiday photo!
                        </CustomUploadButton>

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