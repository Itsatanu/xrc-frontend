import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import useApi from '../hooks/useApi';
import { API_URL } from '../config/urlConfig'
import TimeAndDate from '../function/TimeAndDate';

import { Toastify, toastifyPopUp } from '../component/Toastify'
import Pagination from '../component/Pagination';
import AdminNavbar from '../component/AdminNavbar'
import './AllDepositAndWithdrawal.css'
export default function AllDeposit() {

    const location = useLocation();
    const navigate = useNavigate();
    const totalPages = 100;
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([])
    const [filter, setFilter] = useState('none')
    const [URL, setURL] = useState(`${API_URL}/api/v1/admin/view-deposit?filter=${filter}&page=${currentPage}&limit=10`);
    const isFirstRender = useRef(true);
    const { stateData, stateLoading, stateError, fetchData } = useApi('POST', URL);

    const Style = {
        backgroundColor: 'rgb(43, 61, 226)',
        color: 'white',
        marginLeft: '10px'
    }
    useEffect(() => {
        if (stateData) {
            if (stateData?.data?.deposit !== 0) {
                setData(stateData?.data?.deposit)
            }
        }
    }, [stateData])
    useEffect(() => {
        if (stateError) {
            alert(stateError.error)
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

        if (pageFromQuery) {
            if (pageFromQuery < 1) {
                pageFromQuery = 1;
                navigate(`?page=${pageFromQuery}`, { replace: true });
            } else if (pageFromQuery > totalPages) {
                pageFromQuery = totalPages;
                navigate(`?page=${pageFromQuery}`, { replace: true });
            }
        } else {
            pageFromQuery = 1;
            navigate(`?page=${pageFromQuery}`, { replace: true });
        }

        setCurrentPage(pageFromQuery);
        setURL(`${API_URL}/api/v1/admin/view-deposit?filter=${filter}&page=${pageFromQuery}&limit=10`);
    }, [location, filter]);




    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`?page=${pageNumber}`)
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
                                    <button style={Style} onClick={() => { navigate(`/admin/update-deposit`, { state: redirectData }) }}>Update Deposit</button>

                                    <p className="admin-all-user-output-para">userID: {data[idx].userId}</p>
                                    <p className="admin-all-user-output-para">_id: {data[idx]._id}</p>
                                    <p className="admin-all-user-output-para">walletAddress:  <b
                                        style={{ color: 'rgb(2, 210, 2)', fontSize: '14px' }}
                                        onClick={
                                            async () => {
                                                await navigator.clipboard.writeText(data[idx].walletAddress)
                                                toastifyPopUp('wallet address copied');
                                            }}>{data[idx].walletAddress
                                        }</b></p>
                                    <p className="admin-all-user-output-para">tnxID: <b
                                        style={{ color: 'rgb(185, 185, 185)', fontSize: '14px' }}
                                        onClick={
                                            async (e) => {

                                                await navigator.clipboard.writeText(data[idx].tnxID)
                                                toastifyPopUp('tnx id copied');
                                            }}>{data[idx].tnxID
                                        }</b></p>
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