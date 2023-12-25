import axios from "axios";

export default axios.create({
    baseURL: "https://sharewin.pro/apiv2",
    headers: {
        "Content-type": "application/json",
    },
});