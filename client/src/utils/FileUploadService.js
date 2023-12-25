import axios from "axios";
import http from "./http-common";

const upload = (file, subdomain) => {
    let formData = new FormData();
    const isAuthenticated = localStorage.getItem('token');

    formData.append("file", file, subdomain);

    return http.post(`/file/upload?subdomain=${subdomain}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${isAuthenticated}`
        }
    });
};

const deploy = (file, subdomain, onUploadProgress) => {
    let formData = new FormData();

    formData.append("build", file);
    formData.append("subdomain", subdomain);

    return axios.post("https://bugtech.solutions/api/deploy", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

const verify = (subdomain) => {
    return http.post("/file/verify", { subdomain });
};

const secureSsl = (subdomain) => {
    return http.post("/file/ssl", { subdomain });
};

const deleteSite = (subdomain) => {
    const isAuthenticated = localStorage.getItem('token');

    return http.put("/file/delete", { subdomain }, {
        headers: {
            "Authorization": `Bearer ${isAuthenticated}`
        }
    });
};


const getFiles = () => {
    const isAuthenticated = localStorage.getItem('token');

    return http.get("/file/files", {
        headers: {
            "Authorization": `Bearer ${isAuthenticated}`
        }
    }
    );
};

const FileUploadService = {
    upload,
    getFiles,
    deploy,
    verify,
    secureSsl,
    deleteSite
};

export default FileUploadService; 