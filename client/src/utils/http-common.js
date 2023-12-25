import axios from "axios";

export default axios.create({
    baseURL: "https://sharewin.pro",
    headers: {
        "Content-type": "application/json",
    },
});