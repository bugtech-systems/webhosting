// client/src/components/UrlInfo.js
import React, { useState } from 'react';
import axios from 'axios';
import { env_vars } from '../utils/config';

const UrlInfo = () => {
    const [url, setUrl] = useState('');
    const [info, setInfo] = useState({
        title: '',
        description: '',
        image: '',
    });

    const handleFetchInfo = async () => {
        try {
            const response = await axios.get(`${env_vars.api_url}/file/url?url=${url}`);
            const { title, description, image } = response.data;
            setInfo({ title, description, image });
        } catch (error) {
            console.error('Error fetching URL info:', error.message);
            // Handle error
        }
    };

    return (
        <div>
            <h2>Website Information</h2>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
            <button onClick={handleFetchInfo}>Fetch Info</button>

            {info.title && (
                <div>
                    <h3>Title: {info.title}</h3>
                    <p>Description: {info.description}</p>
                    <img src={info.image} alt={info.title} />
                </div>
            )}
        </div>
    );
};

export default UrlInfo;