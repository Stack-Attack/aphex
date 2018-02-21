import React, { Component } from 'react';
import {PropTypes} from 'prop-types';

class Upload extends Component{

    static propTypes = {
        fileUpload: PropTypes.func.isRequired
    }



    handleUpload(){

        const file = this.fileUpload.files[0];
        this.props.fileUpload(file);
    }


    render(){
        return(
            <div>
                <h1>Upload</h1>
                <input type="file" ref={(ref) => this.fileUpload = ref} />
                <button onClick={() => this.handleUpload()}>
                    Upload
                </button>
            </div>
        )
    }
}


export default Upload;