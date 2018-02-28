import React, { Component } from "react";
import { PropTypes } from "prop-types";

/**
 * Presentational component for audio upload component. Upon uploading a file, its data will be sent up to the parent component where it will be handled accordingly.
 */

class Upload extends Component {
  static propTypes = {
    fileUpload: PropTypes.func.isRequired
  };

  handleUpload() {
    const file = this.fileUpload.files[0];
    this.props.fileUpload(file);
  }

  render() {
    return (
      <div>
        <h1>Upload</h1>
        <input type="file" ref={ref => (this.fileUpload = ref)} />
        <button onClick={() => this.handleUpload()}>Upload</button>
      </div>
    );
  }
}

export default Upload;
