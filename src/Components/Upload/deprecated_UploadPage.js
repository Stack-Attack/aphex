import React, {Component} from "react";
import {PropTypes} from "prop-types";
import {Grid, Image, Button, Form, Header} from "semantic-ui-react";

/**
 * Presentational component for audio upload component. Upon uploading a file, its data will be sent up to the parent component where it will be handled accordingly.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 * @author Kyle Robinson <krobins5@lakeheadu.ca>
 */

class Upload extends Component {
    static propTypes = {
        fileUpload: PropTypes.func.isRequired
    };

    handleUpload() {
        //TODO: make this UX a little nicer. perhaps some feedback or progress bar?
        const file = this.fileUpload.files[0];
        let url = '';
        let fileName = this.refs.fileName.value.trim();


        let reader = new FileReader();
        reader.onload =  e => {
            url = reader.result;
            let newSample = {
                url: url,
                name: fileName
            }
            this.props.fileUpload(newSample);
            //todo: after a successful upload, show some feedback. these should probably change
            document.getElementById("aphexSampleUpload").value = "";
            this.refs.fileName.value = "";
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }


    render() {
        return (
            <div>
                <h1>Upload</h1>
                <input id="aphexSampleUpload" type="file" ref={ref => (this.fileUpload = ref)}/>
                <h3>Name of sample</h3>
                <input type="text" ref="fileName"/>
                <br/>
                <button onClick={() => this.handleUpload()}>Upload</button>
            </div>
        );
    }
}

export default Upload;
