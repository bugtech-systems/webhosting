import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import {  Typography } from "@mui/material";


const FileUpload = ({ uploadFile, progress, selectedFiles, currentFile }) => {


    return (
        <React.Fragment>
      <Typography variant="body1" gutterBottom>
       Project Folder (compressed)
      </Typography>
                   {currentFile && (
                <div className="progress mb-3">
                    <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
                    </div>
                </div>
            )}

            <Dropzone onDrop={uploadFile} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            {selectedFiles && selectedFiles[0].name ? (
                                <div className="selected-file">
                                    {selectedFiles && selectedFiles[0].name}
                                </div>
                            ) : (
                                "Drag and drop file here, or click to select file"
                            )}
                        </div>
                    </section>
                )}
            </Dropzone>
            <Typography variant="body2">Upload Build File</Typography>
         </React.Fragment>
    );
};

export default FileUpload;