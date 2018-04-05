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

    handleUpload() {
        //TODO: make this UX a little nicer. perhaps some feedback or progress bar?
        const file = this.fileUpload.files[0];
        let url = '';
        let fileName = this.refs.fileName.value.trim();
        let description = this.refs.description.value.trim();


        let reader = new FileReader();
        reader.onload =  e => {
            url = reader.result;
            let newSample = {
                url: url,
                name: fileName,
                description: description
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


    render() {
        return (
            <Grid className={"Grid Margin"} centered>
                <Grid.Column textAlign={"center"} className={"MainColumn"} width={"10"} >
                    <Grid.Row>
                        <Header className={"PoiretHeader Intro Upload"}> Upload </Header>
                        <input id="aphexSampleUpload" type="file" ref={ref => (this.fileUpload = ref)}/>
                        <Header className={"PoiretHeader Intro Subtitle"}> Name </Header>
                        <input type="text" ref="fileName" className={"HalfWidth"} />
                        <Header className={"PoiretHeader Intro Subtitle"}> Description </Header>
                        <input type="text" ref="description"/>
                        <Header className={"PoiretHeader Intro Subtitle"}>Type</Header>
                        <Form>
                            <Button className={"Button Sample"} toggle circular>sample</Button>
                            <Button className={"Button Demo"} toggle circular>demo</Button>
                            <Button className={"Button Preview"} toggle circular>preview</Button>
                        </Form>
                        <Grid.Row>
                            <Button className={"UploadButton"} padded inverted icon labelPosition="left" onClick={() => this.handleUpload()}>
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
