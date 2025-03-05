import { useEffect, useState } from "react"
import { useSearchParams,useNavigate } from "react-router-dom"
import AdminNavbar from "../component/AdminNavbar"
import useApi from '../hooks/useApi'
import { API_URL } from '../config/urlConfig'
import './FindUser.css'
export default function FindUser() {

    let nav=useNavigate()
    let [params] = useSearchParams()
    let paramIdType = params.get('idType')
    let paramId = params.get('id')
    if (paramIdType !== 'objectId' && paramIdType !== 'phone') {
        paramIdType = null
    }

    let [idType, setIdType] = useState(paramIdType || 'objectId')
    let [id, setId] = useState(paramId || '')
    let [data, setData] = useState(null)
    let [loading, setLoading] = useState(false)
    let [showRefferel, setShowRefferel] = useState(false)
    let filter = 'objectId'
    let URL = `${API_URL}/api/v1/admin/get-user?filter=${idType}`
    const { stateData: res, stateLoading: lazyload, stateError: error, fetchData } = useApi('POST', URL, JSON.stringify({ id: id }))

    useEffect(() => {
        if (res) {

            setData(res.data)
        }
    }, [res])

    useEffect(() => {
        if (loading === false) {
            setLoading(lazyload)
        }
        if (loading) {
            setLoading(lazyload)
        }
    }, [lazyload])

    useEffect(() => {
        if (error) {
            alert(error.error)
        }
    }, [error])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (id === '') {
            alert(`Please provide valid ${idType}`)
            return
        }
        fetchData()
    }
    return (
        <div>
            <AdminNavbar />
            <div className="admin-main-stracture">
                <div className="find-user-main-container">
                    <form className="find-user-form" onSubmit={handleSubmit}>
                        <div className="find-user-form-div">
                            <label htmlFor="idType">Id type: </label>
                            <select id="idType" name="idType" value={idType} onChange={(e) => { setIdType(e.target.value) }}>
                                <option value="phone">Phone</option>
                                <option value="objectId">Object Id</option>
                            </select>
                        </div>
                        <div className="find-user-form-div">
                            <label htmlFor="id">{idType}: </label>
                            <input id='id' type={idType === 'phone' ? 'number' : "text"} value={id} onChange={(e) => { setId(e.target.value) }} />
                        </div>
                        <div className="find-user-form-div">
                            <button>{loading ? 'Loading...' : 'Submit'}</button>
                        </div>
                    </form>
                    {data && (
                        <div className="find-user-output">
                            <button style={{backgroundColor:'rgb(24, 182, 96)'}} onClick={()=>{nav(`/admin/find-user-deposit-history?userId=${data._id}&page=1`)}}>User All Diposit</button>
                            <button style={{backgroundColor:'rgb(251, 91, 91)',marginLeft:'10px'}} onClick={()=>{nav(`/admin/find-user-withdrawal-history?userId=${data._id}&page=1`)}}>User All Withdrawlal</button>
                            <p className="admin-find-user-output-para">Phone: {data.phone}</p>
                            <p className="admin-find-user-output-para">_id: {data._id}</p>
                            <p className="admin-find-user-output-para">Password: {data.password}</p>
                            <p className="admin-find-user-output-para">Balance: {data.balance}</p>
                            <p className="admin-find-user-output-para">referralBonus: {data.referralBonus}</p>
                            <p className="admin-find-user-output-para">claimReferralBonus: {data.claimReferralBonus}</p>
                            <p className="admin-find-user-output-para">rechargeBonus: {data.rechargeBonus}</p>
                            <p className="admin-find-user-output-para">noOfRecharge: {data.noOfRecharge}</p>
                            <p className="admin-find-user-output-para">totalRecharge: {data.totalRecharge}</p>
                            <p className="admin-find-user-output-para">totalWithdrawal: {data.totalWithdrawal}</p>
                            <p className="admin-find-user-output-para">game: {`{win: ${data.game.win} lose: ${data.game.lose}}`}</p>
                            <p className="admin-find-user-output-para">role: <b>{data.role}</b></p>
                            <div>
                                <p>referredUsers <button style={{backgroundColor:'rgb(107, 107, 107)'}} onClick={() => { setShowRefferel(!showRefferel) }}>{showRefferel ? 'close' : 'open'}</button></p>
                                {showRefferel &&
                                    (data.referredUsers).map((_, idx) => {
                                        return <p key={idx} className="referredUsers-class">{idx + 1}.  {data.referredUsers[idx]}</p>
                                    })
                                }
                            </div>
                        </div>







                    )
                    }
                </div>
            </div>
        </div>
    )
}