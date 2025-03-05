import { useLocation } from 'react-router-dom'
import { API_URL } from '../config/urlConfig'
import useApi from '../hooks/useApi'

import LazyLoading from '../asset/lazyLoading/LazyLoading'

import { Toastify, toastifyPopUp } from '../component/Toastify'
import AdminNavbar from '../component/AdminNavbar'

import './UpdateDepositAndWithdrawal.css'
import { useEffect, useState } from 'react'

export default function UpdateWithdrawal() {

    const location = useLocation()
    const URL = `${API_URL}/api/v1/admin/update-withdrawal`
    const [data, setData]=useState(location.state)
    const [status, setStatus] = useState('failed')
    const [msg,setMsg]=useState('')
    const { stateData, stateLoading, stateError, fetchData } = useApi('POST', URL, JSON.stringify({ id: data?.id, status: status,msg }))

    useEffect(() => {
        if (stateData) {
            toastifyPopUp('Update successful')
            setData({
                ...data,
                status:stateData.data.status
            })
        }
    }, [stateData])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.id === '') {
            setError("Withdrawal ID can't be empty")
            return
        }
        const conformation = confirm('Submit')
        if (conformation === false) {
            return
        }
        fetchData()
    }

    return (
        <div>
            <Toastify />
            <AdminNavbar />
            <div className='admin-panel-update-deposit-withdrawal'>
                {
                    data?.id ?
                        (
                            <div>
                                <h4 className='update-deposit-withdrawal-details'>Withdrawal ID: {data.id}</h4>
                                <h5 className='update-deposit-withdrawal-details'>Amount: {data.amount}</h5>
                                <h5 className='update-deposit-withdrawal-details'>Status: {data.status}</h5>

                                <form className='update-deposit-withdrawal-form' onSubmit={handleSubmit} >
                                    <select id="" name="status" value={status} onChange={(e) => { setStatus(e.target.value) }}>
                                        <option htmlFor='status' value="failed">failed</option>
                                        <option htmlFor='status' value="successful">successful</option>
                                    </select>
                                    {
                                        status === 'failed' && <input placeholder='Enter the reason to be failed' type="text" onChange={(e)=>{setMsg(e.target.value)}} />
                                    }
                                    <button>{stateLoading ? <LazyLoading /> : 'Update Withdrawal'}</button>
                                    {stateError && <div>{stateError.error}</div>}
                                </form>


                            </div>
                        )
                        :
                        (
                            <div style={{ alignContent: 'center' }}>
                                <h2>Please come with proper Withdrawal ID</h2>
                            </div>
                        )
                }
            </div>
        </div>
    )

}