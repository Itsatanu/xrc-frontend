import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import useApi from '../hooks/useApi';
import { API_URL } from '../config/urlConfig'
import Pagination from '../component/Pagination';
import AdminNavbar from '../component/AdminNavbar'
import './AllUsers.css'
export default function AllUsers() {

    const location = useLocation();
    const navigate = useNavigate();
    const totalPages = 100;
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([])
    const [URL, setURL] = useState(`${API_URL}/api/v1/admin/get-all-user?filter=user&page=${currentPage}&limit=5`);
    const isFirstRender = useRef(true);
    const { stateData, stateLoading, stateError, fetchData } = useApi('POST', URL);

    useEffect(() => {
        if (stateData) {
            if (stateData?.data?.profile !== 0) {
                setData(stateData?.data?.profile)
            }
        }
    }, [stateData])
    useEffect(()=>{
        if(stateError){
            alert(stateError.error)
        }
    },[stateError])
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
        setURL(`${API_URL}/api/v1/admin/get-all-user?filter=user&page=${pageFromQuery}&limit=5`);
    }, [location, navigate]); // Added navigate to the dependency array to avoid stale closures




    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`?page=${pageNumber}`)
    };

    return (
        <div>
            <AdminNavbar />
            <div className='admin-all-user-main-stracture'>
                <div>
                    {
                        data.length === 0 && <div style={{color:'white'}}>No data Found</div>
                    }
                    {
                        stateLoading?<div style={{color:'white'}}>Loading...</div>:''
                    }
                    {data.length !== 0 &&
                        data.map((_, idx) => {
                            return (
                                <div key={idx} className="all-user-output">
                                    <button onClick={()=>{open(`/admin/user?idType=objectId&id=${data[idx]._id}`,'_blank')}}>Open User</button>
                                    <p className="admin-all-user-output-para">Phone: {data[idx].phone}</p>
                                    <p className="admin-all-user-output-para">_id: {data[idx]._id}</p>
                                    <p className="admin-all-user-output-para">Password: {data[idx].password}</p>
                                    <p className="admin-all-user-output-para">Balance: {data[idx].balance}</p>
                                    <p className="admin-all-user-output-para">referralBonus: {data[idx].referralBonus}</p>
                                    <p className="admin-all-user-output-para">claimReferralBonus: {data[idx].claimReferralBonus}</p>
                                    <p className="admin-all-user-output-para">rechargeBonus: {data[idx].rechargeBonus}</p>
                                    <p className="admin-all-user-output-para">noOfRecharge: {data[idx].noOfRecharge}</p>
                                    <p className="admin-all-user-output-para">totalRecharge: {data[idx].totalRecharge}</p>
                                    <p className="admin-all-user-output-para">totalWithdrawal: {data[idx].totalWithdrawal}</p>
                                    <p className="admin-all-user-output-para">game: {`{win: ${data[idx].game.win} lose: ${data[idx].game.lose}}`}</p>
                                    <p className="admin-all-user-output-para">role: <b>{data[idx].role}</b></p>
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