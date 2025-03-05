import React from 'react';

import VIP_PHOTO from '../asset/vip.jpg'

import Header from '../component/Header';
import BottomNavBar from '../component/BottomNavBar'

import { useAuth } from '../hooks/useAuth';

import './Vip.css'

export default function Vip() {
    const { user } = useAuth()
    const vip = {
        isVip: false,
        level: 0
    }
    return (
        <div className="account-div">
            <div className="vip-container">

                <div style={{ height: '10%', width: '100%', maxWidth: '500px', position: 'fixed', top: '0', zIndex: '10000000' }}>
                    <Header />
                </div>
                <div className='header-support'></div>
                <div className='transaction-history'>
                    <div className='vip-photo-div'>
                        <img className='rotate' src={VIP_PHOTO} alt="photo" height={200} />
                    </div>
                    <div className="vpi-notify">
                        <h2>{vip.isVip ? `Your current level is VIP ${vip.level}` : 'You are not a VIP'}</h2>
                    </div>
                    <div className="bonus-section">
                        <h3>Your referral user total Deposit</h3>
                        <button className="claim-button" >
                         ${`${(Math.floor(user.data.referralBonus) * 10)}`.length < 5 ? (user.data.referralBonus * 10).toFixed(2) : (user.data.referralBonus * 10).toFixed(1)}
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="commission-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Commission</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>VIP 1</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>VIP 2</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>VIP 3</td>
                                    <td>25%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='vip-condition-list'>
                        <ul className='vip-list'>
                            <li className='vip-items'>If your referral user total Deposit more than <b>$10,000</b>, you are eligible for <b> VIP-1</b></li>
                            <li className='vip-items'>If your referral user total Deposit more than <b>$50,000</b>, you are eligible for <b>VIP-2</b></li>
                            <li className='vip-items'>If your referral user total Deposit more than <b>$100,000</b>, you are eligible for <b>VIP-3</b></li>
                        </ul>

                    </div>
                </div>
                <div className="nav-bar">
                    <BottomNavBar />
                </div>
            </div>


        </div>
    );
};

