import React, { Component } from 'react';

class Upload extends Component{

    constructor(props){
        super(props);


    }


    onChange(e){
        console.log(e.target);
        this.setState({
            file: e.target.files[0]
        });
    }


    render(){
        return(
            <div>
                <h1>Upload</h1>
                <input type="file" onChange={this.onChange} />
            </div>
        )
    }
}


export default Upload;