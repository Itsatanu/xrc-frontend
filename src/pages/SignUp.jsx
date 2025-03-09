import React, { useEffect, useState } from 'react';
import validator from 'validator'
import { NavLink } from 'react-router-dom'
import LazyLoading from '../asset/lazyLoading/LazyLoading';
import useRequestes from '../hooks/useRequestes';
import {API_URL} from '../config/urlConfig'
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const req=useRequestes()
    const navigate = useNavigate();

    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('');
    let [success, setSuccess] = useState('');
    let [referrerId, setReferrerId] = useState('')
    let [showPassword, setShowPassword] = useState(false)
    let eyes = {
        showEyes: {
            value: "show",
            url: "https://img.icons8.com/ios/50/visible--v1.png"
        },
        hideEyes: {
            value: "hide",
            url: "https://img.icons8.com/ios/50/hide.png"
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const referValue = params.get('refer');
        setReferrerId(referrerId=referValue)
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!validator.isMobilePhone(phone)) {
            setError(error = "Enter valid phone number")
            setLoading(loading = false)
            return
        }

        if (phone.length !== 10) {
            setError(error = "Enter valid phone number")
            setLoading(loading = false)
            return
        }
        
        let response= await req.request(`${API_URL}/api/signup`, 'POST', {phone, password, referrerId} )
        setLoading(loading = false)

        if(response.status==400){
            
            setError(error=response.error)
        }
        if(response.status==200){
            localStorage.clear()
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)

            navigate('/')
        }
        
    };

    return (
        <div className='signup-page'>
            <div className="signup-container">
                <h1 className='signup-heading'>Sign Up</h1>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number :</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value)
                                if((e.target.value).length!=10) setError(error='Enter valid phone number')
                                else setError('')
                            }}
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password :</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <img className='eyes'
                            src={showPassword ? eyes.showEyes.url : eyes.hideEyes.url}
                            height={"30px"}
                            alt={showPassword ? eyes.showEyes.value : eyes.hideEyes.value}
                            onClick={() => { setShowPassword(showPassword = !showPassword) }}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <div className="bth-div">
                        <button type="submit" disabled={loading}>
                            {loading ? (<LazyLoading />) : "Sign up"}
                        </button>
                    </div>
                </form>
                <div className='already-account'>
                    Already have an account? <NavLink to="/login">Sign In</NavLink>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
