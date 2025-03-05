import axios from 'axios';
import { useCallback } from 'react';


const useRequestes = () => {

    const auth = useCallback(async (url, method = 'GET', body = {}, headers = {}) => {
        let accessToken = localStorage.getItem('accessToken')
        let refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken || !refreshToken) return ({ status: 400, error: "Don't have auth tokens" })

        if (!url) {
            throw new Error('url is not given')
        }
        // if (!validator.isURL(url)) throw new Error('url is not valid')
        try {
            let config = {
                method: method,
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken},${refreshToken}`,
                    ...headers,
                },
                data: body,
            };

            let response = await axios(config);


            response.data.data.accessToken && localStorage.setItem('accessToken', response.data.data.accessToken)
            response.data.data.refreshToken && localStorage.setItem('refreshToken', response.data.data.refreshToken)
            if (response.data.message === "Refresh Token successful") {
                auth()
            }
            else {
                return { status: 200, data: response.data.data }
            }

        } catch (err) {

            if (err.code == 'ERR_NETWORK') {
                return { status: 400, error: err.message }
            }
            else {
                return { status: 400, error: err.response.data.message }
            }
        }
    }, [])




    const request = async (url, method = 'GET', body = {}, headers = {}) => {

        if (!url) throw new Error('url is not given')
        // if (!validator.isURL(url)) throw new Error('url is not valid')

        try {
            let config = {
                method: method,
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                data: body,
            };
            const response = await axios(config);
            return { status: 200, data: response.data.data }

        } catch (err) {
            if (err.code == 'ERR_NETWORK') {
                return { status: 400, error: err.message }
            }
            else {
                return { status: 400, error: err.response.data.message }
            }
        }
    }

    return { auth, request };
};

export default useRequestes;
