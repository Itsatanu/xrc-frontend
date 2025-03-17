import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiRefreshCw } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import validator from 'validator';

import useApi from '../hooks/useApi'
import { useAuth } from '../hooks/useAuth';

import { API_URL, QR_WALLET_ADDRESS } from '../config/urlConfig';

import LazyLoading from '../asset/lazyLoading/LazyLoading';
import Trc20svg from '../asset/BEP20.svg'


import Header from '../component/Header'
import CryptoAddress from '../component/CryptoAddress';
import { Toastify, toastifyPopUp } from '../component/Toastify'
import QR from '../component/QR';

import './DepositAndWithdrawal.css'



function DepositAndWithdrawal() {
    const { user } = useAuth()
    const location = useLocation()
    const navigate=useNavigate()
    const regex = /^0x[a-fA-F0-9]{40}$/;


    let [balance, setBalance] = useState((user.data.balance) || 0)
    let [amount, setAmount] = useState(0)
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('')
    let [depoditError, setDipositError] = useState("Min Deposit amount is 10 USDT")
    let [withdrawalError, setWithdrawalError] = useState("Min Withdrawal amount is 10 USDT")
    let [walletAddress, setWalletAddress] = useState('')
    let [tnxId, setTnxId] = useState('')




    const queryParams = new URLSearchParams(location.search);
    let page = queryParams.get('page');
    page ? page = page.toLocaleLowerCase() : ''
    if (page == 'deposit' || page == 'withdrawal') { page = page }
    else { page = null }


    const {
        stateData: depositData,
        stateLoading: depositLoading,
        stateError: depositReqError,
        fetchData: depositReq }
        = useApi('POST', `${API_URL}/api/user/deposit`, JSON.stringify({ amount, walletAddress, tnxID: tnxId }));

    const {
        stateData: withdrawalData,
        stateLoading: withdrawalLoading,
        stateError: withdrawalReqError,
        fetchData: withdrawalReq }
        = useApi('POST', `${API_URL}/api/user/withdrawal`, JSON.stringify({ amount, walletAddress }));



    useEffect(() => {
        if (depositData) {
            depositData?.data?.status === 'pending' ? toastifyPopUp('You have successfully made Deposit request') : ''
        }
        if (withdrawalData) {
            if(withdrawalData?.data?.status === 'pending') {
                toastifyPopUp('You have successfully made Withdrawal request')
                setBalance(withdrawalData.data.balance)
             }
        }
    }, [depositData, withdrawalData])

    useEffect(() => {
        if (depositLoading) setLoading(depositLoading)
        else if (depositLoading === false) setLoading(depositLoading)
    }, [depositLoading])

    useEffect(() => {
        if (withdrawalLoading) setLoading(withdrawalLoading)
        else if (withdrawalLoading === false) setLoading(withdrawalLoading)
    }, [withdrawalLoading])

    useEffect(() => {
        depositReqError ? setError(depositReqError.error) : ''
        withdrawalReqError ? setError(withdrawalReqError.error) : ''
    }, [depositReqError, withdrawalReqError])


    const submitDeposit = (e) => {
        e.preventDefault()
        setLoading(loading = true)
        setDipositError(depoditError = '')
        if (isNaN(amount)) {
            setLoading(loading = false)
            setDipositError(depoditError = 'Enter valid number')
            return
        }
        else if (amount < 10) {
            setLoading(loading = false)
            setDipositError(depoditError = 'Min Deposit amount is 10 USDT')
            return
        }
        else if (regex.test(walletAddress)===false) {
            setLoading(loading = false)
            setError('Enter Valid Wallet Address')
            return
        }
        else if(tnxId==''){
            setLoading(loading = false)
            setError('Enter Valid Transaction  Id')
            return  
        }
        depositReq()
    }

    const withdrawalSubmit = async (e) => {
        e.preventDefault()
        setLoading(loading = true)
        setWithdrawalError(withdrawalError = '')
        setError(error = '')
        if (isNaN(amount)) {
            setLoading(loading = false)
            setWithdrawalError(withdrawalError = 'Enter valid number')
            return
        }
        else if (amount < 10) {
            setLoading(loading = false)
            setWithdrawalError(withdrawalError = 'Min withdrawal amount is 10 USDT')
            return
        }
        else if (amount > balance) {
            setLoading(loading = false)
            setWithdrawalError(withdrawalError = 'Enter valid amount')
            return
        }
        if (validator.isEmpty(walletAddress)) {
            setLoading(loading = false)
            setError(error = 'Enter valid wallet address')
            return
        }

        withdrawalReq()
    }

    return (
        <div>
            <Toastify />
            <div className="account-div">
                <div className="container">
                    <div style={{ height: '10%', width: '100%', maxWidth: '500px', position: 'fixed', top: '0', zIndex: '10000000' }}>
                        <Header />
                    </div>
                    <div className='header-support'></div>
                    <div className="balance-div">
                        <div>
                            Balance: {balance.toFixed(2)} USDT
                        </div>
                        <FiRefreshCw style={{ animation: 'rotate 1.5s linear ' }} />
                    </div>
                    {page &&
                        <div className="diposit-withdrawl-div">
                            <h2>{page == 'deposit' ? 'Deposit' : 'Withdrawal'}</h2>
                            {
                                page == 'deposit' &&
                                <>
                                    <div className='qr-div'>
                                        <QR address={QR_WALLET_ADDRESS} />
                                    </div>
                                    <CryptoAddress address={QR_WALLET_ADDRESS} />
                                    <form onSubmit={submitDeposit}>

                                        <div className='style-inp-div'>
                                            <div className='inp-deposit-div'>
                                                <label htmlFor="deposit-inp"><b>USDT (BEP20)</b></label>
                                                <input placeholder='No of USDT' type="text" id="deposit-inp" onChange={(e) => { setAmount(Number(e.target.value)) }} />
                                                <label htmlFor="deposit-inp" className='deposit-inp-err'>{depoditError}</label>
                                            </div>
                                            <div className='usdt-trc20'>
                                                <img src={Trc20svg} height={50} alt="" />
                                            </div>
                                        </div>
                                        <div className='wallet-address-div'>
                                            <label htmlFor="wallet-address"><b>Wallet address (USDT -BEP20)</b></label>
                                            <input type="text" id="wallet-address" placeholder='Enter wallet address' onChange={(e) => setWalletAddress(e.target.value)} />
                                        </div>
                                        <div className='wallet-address-div'>
                                            <label htmlFor="wallet-address"><b>Transaction Id (Tnx Id)</b></label>
                                            <input type="text" id="wallet-address" placeholder='Enter Tnx Id' onChange={(e) => setTnxId(e.target.value)} />
                                            <label htmlFor="wallet-address" className='deposit-inp-err'>{error}</label>
                                        </div>

                                        <div className='btn-div-depodit'>
                                            <button className='claim-button' style={{ width: '120px' }}>
                                                {loading ? <LazyLoading /> : 'Depodit'}
                                            </button>
                                        </div>

                                    </form>
                                </>


                            }

                            {
                                page == 'withdrawal' &&
                                <form onSubmit={withdrawalSubmit}>
                                    <div className='style-inp-div'>
                                        <div className='inp-deposit-div'>
                                            <label htmlFor="deposit-inp"><b>USDT (BEP20)</b></label>
                                            <input placeholder='No of USDT' type="text" id="deposit-inp" onChange={(e) => setAmount(amount = Number(e.target.value))} />
                                            <label htmlFor="deposit-inp" className='deposit-inp-err'>{withdrawalError}</label>
                                        </div>
                                        <div className='usdt-trc20'>
                                            <img src={Trc20svg} height={50} alt="" />
                                        </div>
                                    </div>
                                    <div className='wallet-address-div'>
                                        <label htmlFor="wallet-address"><b>Wallet address (USDT -BEP20)</b></label>
                                        <input type="text" id="wallet-address" placeholder='Enter wallet address' onChange={(e) => setWalletAddress(walletAddress = e.target.value)} />
                                        <label htmlFor="wallet-address" className='deposit-inp-err'>{error}</label>
                                    </div>
                                    <div className='btn-div-depodit'>
                                        <button className='claim-button' style={{ width: '120px' }}>
                                            {loading ? <LazyLoading /> : 'Withdrawal'}
                                        </button>
                                    </div>

                                </form>
                            }

                            <div className='transaction-history-div'>
                                <button className='tanx-btn' onClick={() => {
                                    if(page==='deposit') navigate('/tnx-history?page=deposit')
                                    else if(page==='withdrawal') navigate('/tnx-history?page=withdrawal')
                                }}>
                                    See all {page} <FaCaretDown />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default DepositAndWithdrawal