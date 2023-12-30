import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Dropzone from "react-dropzone";

import DeploymentService from "../../utils/DeploymentService";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const FileUpload = ({ handleGetFiles }) => {
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);
    const [isAvailable, setAvailability] = useState(null);
    const [subdomain, setSubdomain] = useState('');

    useEffect(() => {
        DeploymentService.getFiles().then((response) => {
            setFileInfos(response.data);
        }).catch(err => {
            console.log(err)
        });
    }, []);

    const uploadFile = (files) => {
        // e.preventDefault()
        if (files.length > 0) {
            setSelectedFiles(files);
        }
        let currentFile = files[0];

        setProgress(0);
        setCurrentFile(currentFile);

        DeploymentService.upload(currentFile, subdomain, (event) => {
        console.log()
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {

                setMessage(response.data.message);
                handleGetFiles()
                // navigate('/')
            })
            .catch(() => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
            });

        setSelectedFiles(undefined);
    };


    const onDrop = (files) => {
        if (files.length > 0) {
            setSelectedFiles(files);
        }
    };





    const handleVerify = (e) => {
        e.preventDefault();

        DeploymentService.verify(subdomain)
            .then(({ data }) => {
                let { availability } = data;
                setAvailability(availability)
                // setMessage(response.data.message);
                // return DeploymentService.getFiles();
            })
            .catch(err => {
                setAvailability(null)
            })
    }



    return (
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
       Upload Project Files (.zip)
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
                      {/*   <aside className="selected-file-wrapper">
                            <Button variant="contained"
                                disabled={!selectedFiles}
                                onClick={uploadFile}
                            >
                                Deploy!
                            </Button>

                        </aside> */}
                    </section>
                )}
            </Dropzone>
         </React.Fragment>
    );
};

export default FileUpload;