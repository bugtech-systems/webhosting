import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Dropzone from "react-dropzone";

import FileUploadService from "../utils/FileUploadService";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const UploadFiles = ({ handleGetFiles }) => {
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);
    const [isAvailable, setAvailability] = useState(null);
    const [subdomain, setSubdomain] = useState('');

    useEffect(() => {
        FileUploadService.getFiles().then((response) => {
            setFileInfos(response.data);
        }).catch(err => {
            console.log(err)
        });
    }, []);

    const uploadFile = (e) => {
        e.preventDefault()
        let currentFile = selectedFiles[0];

        setProgress(0);
        setCurrentFile(currentFile);

        FileUploadService.deploy(currentFile, subdomain, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {

                // setMessage(response.data.message);
                return FileUploadService.upload(currentFile, subdomain);
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

        FileUploadService.verify(subdomain)
            .then(({ data }) => {
                let { availability } = data;
                setAvailability(availability)
                // setMessage(response.data.message);
                // return FileUploadService.getFiles();
            })
            .catch(err => {
                setAvailability(null)
            })
    }



    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="cnter">
                <TextField
                    label="Subdomain Name"
                    placeholder="Craft a memorable web address. Start with your custom subdomain."
                    id="outlined-start-adornment"
                    fullWidth
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    margin="normal"
                    sx={{ width: '80%' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">.bugtech.solutions</InputAdornment>,
                        startAdornment: <InputAdornment position="start">{
                            isAvailable === null ?
                                <DomainVerificationIcon />
                                : isAvailable === false ?
                                    <HighlightOffIcon color="error" />
                                    :
                                    <DomainVerificationIcon color="success" />
                        }</InputAdornment>,
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button color="info" variant="contained" style={{ marginRight: 3 }} onClick={handleVerify}>
                        Check Availability
                    </Button>
                </div>
            </Box >
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

            <Dropzone onDrop={onDrop} multiple={false} disabled={!isAvailable}>
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
                        <aside className="selected-file-wrapper">
                            <Button variant="contained"
                                disabled={!selectedFiles}
                                onClick={uploadFile}
                            >
                                Deploy!
                            </Button>

                        </aside>
                    </section>
                )}
            </Dropzone>

            {
                fileInfos.length > 0 && (
                    <div className="card">
                        <div className="card-header">List of Files</div>
                        <ul className="list-group list-group-flush">
                            {fileInfos.map((file, index) => (
                                <li className="list-group-item" key={index}>
                                    <a href={file.url}>{file.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div >
    );
};

export default UploadFiles;