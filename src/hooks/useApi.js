import { useState, useCallback } from 'react';
import axios from 'axios';

const useApi = (method = 'GET', url, requestData = {}, customHeaders = {}) => {
    const [stateData, setStateData] = useState(null);
    const [stateLoading, setStateLoading] = useState(false);
    const [stateError, setStateError] = useState(null);
    const fetchData = async () => {
        let accessToken = localStorage.getItem('accessToken')
        let refreshToken = localStorage.getItem('refreshToken')

        if (!url) {
            throw new Error('URL is required');

        }

        if (!accessToken || !refreshToken) {
            setStateError({ status: 400, error: "Don't have auth tokens" })
            return
        }
        setStateLoading(true);
        setStateError(null)
        setStateData(null)

        const config = {
            method,
            url,
            data: requestData, // for POST/PUT requests
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken},${refreshToken}`,
                ...customHeaders
            },
        };

        try {
            const response = await axios(config);
            response.data.data.accessToken && localStorage.setItem('accessToken', response.data.data.accessToken)
            response.data.data.refreshToken && localStorage.setItem('refreshToken', response.data.data.refreshToken)
            if (response.data.message === "Refresh Token successful") {
                fetchData()
            }
            else {
                setStateData({ status: 200, data: response.data.data })
            }
        } catch (err) {
            if (err.code == 'ERR_NETWORK') {
                setStateError({ status: 400, error: err.message })
            }
            else {
                setStateError({ status: 400, error: err.response.data.message })
            }
        } finally {

            setStateLoading(false);
        }
    }

    return { stateData, stateLoading, stateError, fetchData };
};

export default useApi;
