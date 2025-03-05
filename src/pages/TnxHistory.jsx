import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import { API_URL } from "../config/urlConfig"

import TimeAndDate from "../function/TimeAndDate"
import char1stUP from "../function/char1stUP"

import LazyLoading from '../asset/lazyLoading/LazyLoading'

import useApi from "../hooks/useApi"

import Header from "../component/Header"

import './TnxHistory.css'


export default function TnxHistory() {
    const [params] = useSearchParams()
    const page = (params.get('page') || null)?.toLowerCase()
    let [transaction, setTransaction] = useState([])
    let [loading, setLoading] = useState(false)
    let [noDataFound, setNoDataFound] = useState('')

    const {
        stateData: depositData,
        stateLoading: depositLoading,
        stateError: depositReqError,
        fetchData: depositReq }
        = useApi('POST', `${API_URL}/api/user/deposit-history`);

    const {
        stateData: withdrawalData,
        stateLoading: withdrawalLoading,
        stateError: withdrawalReqError,
        fetchData: withdrawalReq }
        = useApi('POST', `${API_URL}/api/user/withdrawal-history`);

    useEffect(() => {
        if (page === 'deposit') depositReq()
        else if (page === 'withdrawal') withdrawalReq()
    }, [])

    useEffect(() => {
        if (depositData) {
            setTransaction(depositData.data)
            if ((depositData.data).length === 0) setNoDataFound('No Data Found')
        }
        else if (withdrawalData) {
            setTransaction(withdrawalData.data)
            if ((withdrawalData.data).length === 0) setNoDataFound('No Data Found')
        }
    }, [depositData, withdrawalData])

    useEffect(() => {
        if (depositLoading === false) setLoading(false)
        else if (depositLoading === true) setLoading(true)
    }, [depositLoading])

    useEffect(() => {
        if (withdrawalLoading === false) setLoading(false)
        else if (withdrawalLoading === true) setLoading(true)
    }, [withdrawalLoading])

    useEffect(() => {
        if (depositReqError) alert(depositReqError.error)
        else if (withdrawalReqError) alert(withdrawalReqError.error)
    }, [depositReqError, withdrawalReqError])

    return (
        <div className="account-div">
            <div className="container">
                <div style={{ height: '10%', width: '100%', maxWidth: '500px', position: 'fixed', top: '0', zIndex: '10000000' }}>
                    <Header />
                </div>
                <div className='header-support'></div>
                <div className='transaction-history'>

                    {
                        loading ? <div className="transaction-history-loader-div"><LazyLoading color={'rgb(245, 115, 37)'} /></div> : ''
                    }
                    {
                        noDataFound &&
                        <div className="transaction-history-loader-div">
                            <div>
                                {noDataFound}
                            </div>
                        </div>
                    }
                    {
                        transaction.length !== 0 &&
                        transaction.map((_, e) => {
                            let timeAndDate = TimeAndDate(transaction[e].date)
                            let style
                            if (transaction[e].status == 'successful') style = { color: 'rgb(16, 171, 0)' }
                            else if (transaction[e].status == 'pending') style = { color: 'rgb(214, 158, 3)' }
                            else if(transaction[e].status == 'failed') style = { color: 'rgb(255, 36, 36)' }



                            return (
                                <div key={e} className='tsnx-div'>
                                    <div className={`${page}-tsnx-type-status`}>
                                        <button disabled>{
                                            page === 'deposit' ? 'Deposit' : 'Withdrawal'
                                        }</button>
                                        <div style={style}>{char1stUP(transaction[e].status)}</div>
                                    </div>
                                    <div className="tsnx-div-style">
                                        Amount: <div><b style={{ color: 'rgb(214, 158, 3)' }}>{transaction[e].amount} USDT</b></div>
                                    </div>
                                    <div className="tsnx-div-style">
                                        TUID: <div>{transaction[e]._id}</div>
                                    </div>
                                    <div className="tsnx-div-style">
                                        Time: <div>{timeAndDate?.time}</div>
                                    </div>
                                    <div className="tsnx-div-style">
                                        Date: <div>{timeAndDate?.date}</div>
                                    </div>
                                    {
                                        transaction[e].status === 'failed' ? <div style={{ padding: '5px 0px' }}>Message: <span style={{ color: 'rgb(254, 81, 81)', fontSize: '14px' }}>{transaction[e].msg}</span></div> : ""
                                    }
                                    <div style={{ padding: '5px 0px' }}>
                                        Wallet Address: <span style={{ color: 'rgb(61, 61, 61)', fontSize: '14px' }}>{transaction[e].walletAddress}</span>
                                    </div>
                                    {
                                        page === 'deposit' ? <div style={{ padding: '5px 0px' }}>Tnx ID: <span style={{ color: 'rgb(61, 61, 61)', fontSize: '14px' }}>{transaction[e].tnxID}</span></div> : ''
                                    }


                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}