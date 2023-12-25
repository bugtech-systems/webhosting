import axios from "axios";

export default axios.create({
    baseURL: "https://sharewin.pro/api",
    headers: {
        "Content-type": "application/json",
    },
});