import React, {Component} from "react";
import {PropTypes} from "prop-types";
import "./UploadPage.css";
import {Grid, Image, Button, Form, Header, Icon, Dropdown} from "semantic-ui-react";


/**
 * Presentational component for audio upload component. Upon uploading a file, its data will be sent up to the parent component where it will be handled accordingly.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

class Upload extends Component {
    static propTypes = {
        fileUpload: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.typeSound = '';
    }

    handleUpload() {

        //TODO: make this UX a little nicer. perhaps some feedback or progress bar?
        const file = this.fileUpload.files[0];
        let url = '';
        let fileName = this.refs.fileName.value.trim();
        let description = this.refs.description.value.trim();

        let error = "";

        if(this.fileUpload.files.length == 0){
            alert("Please select a file to upload");
            return;
        }
        if(this.typeSound == ''){
            alert("Please choose a type.");
            return;
        }
        if(this.fileName == ''){
            alert("Please enter a title for the sound");
        }

        let reader = new FileReader();
        reader.onload =  e => {
            url = reader.result;
            let newSample = {
                url: url,
                name: fileName,
                description: description,
                type: this.typeSound
            }
            this.props.fileUpload(newSample);
            //todo: after a successful upload, show some  PROCESSING feedback. these should probably change
            document.getElementById("aphexSampleUpload").value = "";
            this.refs.fileName.value = "";
            this.refs.description.value = "";
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    typeClick(type){
        this.typeSound = type;
    }

    render() {
        return (
            <Grid className={"Grid Margin"} centered>
                <Grid.Column textAlign={"center"} className={"MainColumn"} width={"10"} >
                    <Grid.Row>
                        <Header className={"PoiretHeader Intro Upload"}> Upload </Header>
                        <input id="aphexSampleUpload" type="file" ref={ref => (this.fileUpload = ref)}/>
                        <Header className={"PoiretHeader Intro Subtitle"}> Name: </Header>
                        <input type="text" ref="fileName" className={"HalfWidth"} />
                        <Header className={"PoiretHeader Intro Subtitle"}> Description: </Header>
                        <input type="text" ref="description"/>
                        <Header className={"PoiretHeader Intro Subtitle"}>Type:</Header>
                        <Form>
                            <Button onClick={() => this.typeClick('sample')} className={"Button Sample"} toggle circular>sample</Button>
                            <Button onClick={() => this.typeClick('demo')} className={"Button Demo"} toggle circular>demo</Button>
                            <Button onClick={() => this.typeClick('preview')} className={"Button Preview"} toggle circular>preview</Button>
                        </Form>
                        <Grid.Row>
                            <Button className={"UploadButton Margin"} inverted icon labelPosition="left" onClick={() => this.handleUpload()}>
                                <Icon name="upload"/>
                                Upload
                            </Button>
                        </Grid.Row>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Upload;
