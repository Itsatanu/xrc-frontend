import { useState } from "react";
import axios from "axios";
import { AuthContext } from './AuthContext'
import { API_URL } from "../config/urlConfig";


const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);

    const updateIsAuthenticated = (data) => {
        setIsAuthenticated(data)
    };

    const updatePageLogin = (data) => {
        setPageLoading(data)
    };

    const vefifyAuth = async () => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')


        try {
            if (!accessToken || !refreshToken) {
                throw new Error("Authentication failed")
            }

            let config = {
                method: 'POST',
                url: `${API_URL}/api/user`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken},${refreshToken}`,
                },
                data:{

                }
            };

            let response = await axios(config);

            response.data.data.accessToken && localStorage.setItem('accessToken', response.data.data.accessToken)
            response.data.data.refreshToken && localStorage.setItem('refreshToken', response.data.data.refreshToken)


            if (response?.data?.message === "Refresh Token successful") {
                await vefifyAuth()
            }
            else {
                // response.data.data.role = 'user';
                setUser(response?.data)
                setIsAuthenticated(true)
            }

        } catch (error) {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            updateIsAuthenticated,
            user,
            pageLoading,
            updatePageLogin,
            vefifyAuth,
            logout
        }}>

            {children}

        </AuthContext.Provider>
    )

}


export default AuthProvider