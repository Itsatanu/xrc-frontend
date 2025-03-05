import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import useApi from '../hooks/useApi';
import { API_URL } from '../config/urlConfig'
import TimeAndDate from '../function/TimeAndDate';

import ScamProtection from './ScamProtection';
import { Toastify, toastifyPopUp } from '../component/Toastify'
import Pagination from '../component/Pagination';
import AdminNavbar from '../component/AdminNavbar'
import './AllDepositAndWithdrawal.css'
export default function UserAllWithdrawal() {

    const location = useLocation();
    const navigate = useNavigate();
    const totalPages = 100;
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([])
    const [userId, setUserId] = useState('')
    const [filter, setFilter] = useState('none')
    const [URL, setURL] = useState(`${API_URL}/api/v1/admin/get-user-all-withdrawal?id=${userId}&filter=${filter}&page=${currentPage}&limit=10`);
    const isFirstRender = useRef(true);
    const { stateData, stateLoading, stateError, fetchData } = useApi('POST', URL);

    const Style = {
        backgroundColor: 'rgb(43, 61, 226)',
        color: 'white',
        marginLeft: '10px'
    }
    useEffect(() => {
        if (stateData) {
            if (stateData?.data?.withdrawal !== 0) {
                setData(stateData?.data?.withdrawal)
            }
        }
    }, [stateData])
    useEffect(() => {
        if (stateError) {
            alert(stateError.error)
            setData('')
        }
    }, [stateError])
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        fetchData()
    }, [URL])
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let pageFromQuery = parseInt(params.get('page'), 10);
        let userIdQuery = params.get('userId');

        if (pageFromQuery) {
            if (pageFromQuery < 1) {
                pageFromQuery = 1;
                navigate(`?userId=${userIdQuery}&page=${pageFromQuery}`, { replace: true });
            } else if (pageFromQuery > totalPages) {
                pageFromQuery = totalPages;
                navigate(`?userId=${userIdQuery}&page=${pageFromQuery}`, { replace: true });
            }
        } else {
            pageFromQuery = 1;
            navigate(`?userId=${userIdQuery}&page=${pageFromQuery}`, { replace: true });
        }

        setCurrentPage(pageFromQuery);
        setUserId(userIdQuery)
        setURL(`${API_URL}/api/v1/admin/get-user-all-withdrawal?id=${userIdQuery}&filter=${filter}&page=${pageFromQuery}&limit=10`);
    }, [location, filter]);




    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`?userId=${userId}&page=${pageNumber}`)
    };

    return (
        <div>
            <Toastify />
            <AdminNavbar />
            <div className="update-deposit-withdrawal-filter">
                <select id="" name="filter" onChange={(e) => { setFilter(e.target.value) }}>
                    <option htmlFor='filter' value="none">None</option>
                    <option htmlFor='filter' value="failed">failed</option>
                    <option htmlFor='filter' value="successful">successful</option>
                    <option htmlFor='filter' value="pending">pending</option>
                </select>
            </div>
            <div style={{ height: '30px', display: 'flex', justifyContent: 'end', alignItems: 'end', background: 'rgb(27, 27, 27)' }}>
                <input style={{ height: '25px', borderRadius: '10px' }} type="text" placeholder='  User ID' onChange={(e) => { navigate(`?userId=${e.target.value}&page=${currentPage}`, { replace: true }) }} />
            </div>
            <div className='admin-all-user-main-stracture'>

                <div>
                    {
                        data.length === 0 && <div style={{ color: 'white' }}>No data Found</div>
                    }
                    {
                        stateLoading ? <div style={{ color: 'white' }}>Loading...</div> : ''
                    }
                    {data.length !== 0 &&
                        data.map((_, idx) => {
                            const timeAndDate = TimeAndDate(data[idx].date)
                            const redirectData = {
                                id: data[idx]._id,
                                amount: data[idx].amount,
                                status: data[idx].status
                            }
                            return (
                                <div key={idx} className="all-user-output">
                                    <button onClick={() => { open(`/admin/user?idType=objectId&id=${data[idx].userId}`, '_blank') }}>Open User</button>
                                    <button style={Style}  onClick={() => { navigate(`/admin/update-withdrawal`, { state: redirectData }) }}>Update Withdrawal</button>
                                    <div style={{ marginTop: '10px' }}>
                                        <ScamProtection userId={data[idx].userId} />
                                    </div>
                                    <p className="admin-all-user-output-para">userID: {data[idx].userId}</p>
                                    <p className="admin-all-user-output-para">_id: {data[idx]._id}</p>
                                    <p className="admin-all-user-output-para">walletAddress: <b
                                        style={{ color: 'red', fontSize: '14px' }}
                                        onClick={
                                            async (e) => {
                                                await navigator.clipboard.writeText(data[idx].walletAddress)
                                                toastifyPopUp('wallet address copied');
                                            }}>{data[idx].walletAddress
                                        }</b>
                                    </p>
                                    <p className="admin-all-user-output-para">amount: {data[idx].amount}</p>
                                    <p className="admin-all-user-output-para">status: {data[idx].status}</p>
                                    <p className="admin-all-user-output-para">time: {timeAndDate.time}</p>
                                    <p className="admin-all-user-output-para">date: {timeAndDate.date}</p>
                                </div>
                            )
                        })

                    }
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};