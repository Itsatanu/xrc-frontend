import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaPhone, FaFileAlt, FaSignOutAlt, FaUserFriends } from "react-icons/fa";
import './Account.css';
import useApi from '../hooks/useApi';
import { DOMAIN_URL,API_URL } from '../config/urlConfig'

import LazyLoading from '../asset/lazyLoading/LazyLoading';

import { Toastify, toastifyPopUp } from '../component/Toastify'
import BottomNavBar from '../component/BottomNavBar'
import RedirectButton from '../component/RedirectButton';
import PopUpPage from '../component/PopUpPage'
import { useAuth } from '../hooks/useAuth';
import profile_pic from '../asset/profile-pic.png'

const Account = () => {

    // let [bonusClaimed, setBonusClaimed] = useState(false);
    let [balance, setBalance] = useState(0);
    let [phone, setPhone] = useState(0)
    let [vip, setVip] = useState(false)
    let [bonus, setBonus] = useState(0)
    let [copy, setCopy] = useState('Copy')
    let [popupData, setPopupData] = useState("")
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const { user,logout } = useAuth()

    const { stateData, stateLoading, stateError, fetchData } = useApi('POST', `${API_URL}/api/user/claim-bonus`); // URL is provided


    useEffect(() => {
        setBalance(user.data.balance)
        setPhone(user.data.phone)
        setBonus(user.data.referralBonus-user.data.claimReferralBonus)
    },[])
    useEffect(()=>{
        if(stateData){
            setBalance(stateData.data.balance)
            setBonus(stateData.data.referralBonus - stateData.data.claimReferralBonus)
            toastifyPopUp('Bouns claimed')
        }
    },[stateData])
    useEffect(()=>{
        if(stateError){
            toastifyPopUp(stateError.error,{error:true})

        }
    },[stateError])


    const claimBonus = () => {
        if(bonus<=0){
            return
        }
        fetchData()
    };

    let styles = {
        depositButton: {
            height: "40px",
            width: "120px",
            color: "white",
            backgroundColor: "rgb(24, 182, 96)",
            borderRadius: "20px",
            border: "none",
            fontSize: "18px"
        },
        withdrawalButton: {
            height: "40px",
            width: "120px",
            color: "white",
            backgroundColor: "rgb(251, 91, 91)",
            borderRadius: "20px",
            border: "none",
            fontSize: "18px"
        }
    }
    let data = {
        about: {
            heading: 'About us',
            content: "We are web3 decentralized gaming organization , we don't store any kind of personal data . This webapp is in beta version, only for few users for testing putpose only."
        },
        contact: {
            heading: 'Contact us',
            content: "This app is in beta version, only for few users for testing putpose only and not ready to play. All contract details will be updated with the next stable release. coming soon..."
        },
        tc: {
            heading: 'T&C',
            content: "You may only access, browse and use the Website if gambling is legal in your country and you are at least 18 years of age or over. The use of the Website is subject to all applicable federal laws and regulations. You may access, browse and view the Website solely for your own personal non-commercial use. While accessing or using the Website, you agree and accept to comply with the Terms as well as all applicable laws, rules and regulations. You are solely responsible for any of your actions which breach the Terms. You may not use the Website in a way which would disrupt the use of the Website by other persons. We reserve the right to investigate any breach or alleged breach of the Terms and to report to law enforcement authorities as well as to prevent you from using the Website. We may limit or terminate your use of the Website for any reason or for no reason at any time. We also reserve the right to refuse or accept post, display or transmit any material which you submit to the Website. We shall not be obliged to store or maintain any information submitted to or posted on the Website and will not be held liable for any failure to store or maintain any such information."
        },
        refer: {
            heading: 'Refer ',
            content: "If you refer a person and he atlast deposit 10 USDT, you will get 10% commision."
        }
    }

    const openAboutPopup = (path) => {
        if (path == 'about') setPopupData(popupData = data.about)
        if (path == 'contact') setPopupData(popupData = data.contact)
        if (path == 'tc') setPopupData(popupData = data.tc)
        if (path == 'refer') setPopupData(popupData = data.refer)

        setIsPopupOpen(true);
    };

    const closeAboutPopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="account-div">
            <Toastify/>
            <div className="container">

                <div className="profile-section">
                    <img src={profile_pic} alt="Profile Picture" />
                    <div>
                        <h2>Name : Unknown</h2>
                        <p>Phone : {phone} </p>
                        <h1 className="vip-status">{vip ? 'vip' : ''}</h1>
                    </div>
                </div>

                <div className='account-home'>
                    <div className='account-home-balance'>{stateLoading?<LazyLoading/>:`Balance: ${balance.toFixed(4)} USDT`}</div>
                    <div className='account-home-redirect-button'>
                        <RedirectButton title={"Deposit"} redirectPath={"/balance?page=Deposit"} styles={styles.depositButton} />
                        <RedirectButton title={"Withdrawal"} redirectPath={"/balance?page=Withdrawal"} styles={styles.withdrawalButton} />
                    </div>
                </div>

                <div className="bonus-section">
                    <h3>Claim Your Bonus</h3>
                    <button className="claim-button" onClick={claimBonus}>
                        {bonus.toFixed(2)} USDT
                    </button>
                </div>
                <label htmlFor="refer-div" className='refer-div-label'>Refer your friend</label>
                <div className="refer-div" id='refer-div'>
                    <input type="text" value={`${DOMAIN_URL}/signup?refer=${phone}`} readOnly />
                    <button onClick={async () => {
                        await navigator.clipboard.writeText(`${DOMAIN_URL}/signup?refer=${phone}`)
                        setCopy(copy = 'Copied')
                        setTimeout(() => {
                            setCopy(copy = 'Copy')
                        }, 1500)
                    }}>{copy}</button>
                </div>


                {isPopupOpen && <PopUpPage data={popupData} closePopup={closeAboutPopup} />}


                <div className="account-settings">
                    <div className="settings-item" onClick={() => { openAboutPopup('about') }}>
                        <span className="text">About</span>
                        <FaInfoCircle className="icon" />
                    </div>

                    <div className="settings-item" onClick={() => { openAboutPopup('contact') }}>
                        <span className="text">Contact</span>
                        <FaPhone className="icon" />
                    </div>

                    <div className="settings-item" onClick={() => { openAboutPopup('refer') }}>
                        <span className="text">Refer</span>
                        <FaUserFriends className="icon" />
                    </div>

                    <div className="settings-item" onClick={() => { openAboutPopup('tc') }}>
                        <span className="text">T&C</span>
                        <FaFileAlt className="icon" />
                    </div>

                    <div className="settings-item" onClick={()=>{logout()}}>
                        <span className="text" >Logout</span>
                        <FaSignOutAlt className="icon" />
                    </div>
                </div>
                <BottomNavBar />
            </div>


        </div>
    );
};

export default Account;
