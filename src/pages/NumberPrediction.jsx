//npm import
import { useEffect, useState, useCallback } from 'react'
import { title } from 'dynamic-web-header'

//local import
import { Toastify, toastifyPopUp } from '../component/Toastify'
import useApi from '../hooks/useApi';
import { API_URL } from '../config/urlConfig'
import Header from '../component/Header';
import RedirectButton from '../component/RedirectButton'
import Game from '../component/Game'
import BottomNavBar from '../component/BottomNavBar';
import LazyLoading from '../asset/lazyLoading/LazyLoading'
import BetAmount from '../component/BetAnount';
import { useAuth } from '../hooks/useAuth'
import './NumberPrediction.css'

function NumberPrediction() {

    let { user } = useAuth()

    let winAmount = 0

    let [balance, setBalance] = useState((user.data.balance) || 0)
    let [betAmount, setBetAmount] = useState(0)
    let [termsAndConditions, setTermsAndConditions] = useState(true)
    let [number, setNumber] = useState(-1)
    let [winChance, setWinChance] = useState(49)
    let [error, setError] = useState('')
    let [loading, setLoading] = useState(false)
    let [showPopup, setShowPopup] = useState(false)


    const URL = `${API_URL}/api/user/number-predection`
    const { stateData, stateLoading, stateError, fetchData } = useApi('POST', URL, JSON.stringify({ betAmount, winChance })); // URL is provided


    useEffect(() => {
        title("Game | Number Prediction")
    }, [])
    useEffect(() => {
        if (stateData) {
            if (stateData.data.win) {
                winAmount = (stateData.data.winAmount).toFixed(4)
                toastifyPopUp(`You win ${winAmount} USDT`)
            }
            setNumber(stateData.data.number)
            setShowPopup(true)
            setBalance(stateData.data.balance)
        }

    }, [stateData])


    useEffect(() => {
        if (stateError) {
            setError(stateError.error)
        }
    }, [stateError])


    useEffect(() => {
        if (stateLoading === false) {

            setLoading(loading = stateLoading)
        }
        if (setLoading) {
            setLoading(loading = stateLoading)
        }
    }, [stateLoading])

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




    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(loading = true)
        if (0.099999999 >= betAmount || !betAmount) {
            setError(error = 'Enter valid amount')
            setLoading(false);
            return
        }
        else if (balance < betAmount) {
            setError(error = "You don't have enough balance")
            setLoading(false);
            return
        }
        else if (termsAndConditions !== true) {
            setError(error = "Accept out T & C")
            setLoading(false);
            return
        }
        else {
            setError(error = '')
        }


        fetchData()


    }


    return (
        <div className="home-page">
            <div className="home-div">

                <div style={{ height: '10%', width: '100%', maxWidth: '500px', position: 'fixed', top: '0', zIndex: '10000000' }}>
                    <Header />
                </div>
                <div className='header-support'></div>


                <div className='account-home' >
                    <div className='account-home-balance'>Balance: {balance.toFixed(4)} USDT</div>
                    <div className='account-home-redirect-button'>
                        <RedirectButton title={"Deposit"} redirectPath={"/balance?page=Deposit"} styles={styles.depositButton} />
                        <RedirectButton title={"Withdrawal"} redirectPath={"/balance?page=Withdrawal"} styles={styles.withdrawalButton} />
                    </div>
                </div>
                <div className="game-section">
                    <Toastify />
                    <Game onChange={(e) => { setWinChance(winChance = Number(e.target.value)) }} value={number.toFixed(2)} event={showPopup} />
                </div>
                <BetAmount setBetData={(betData, agreement) => { setBetAmount(betData); setTermsAndConditions(agreement) }} />
                <form className="batting-div" onSubmit={handleSubmit}>
                    <div className='show-error'>{error}</div>
                    <div className="bap-footer">
                        <button className="bap-cancel-button" disabled>
                            Cancel
                        </button>
                        <button type='submit' className="bap-total-button" disabled={(loading)} >
                            {(loading) ? (<LazyLoading />) : <div>Bet amount ${betAmount.toFixed(2)}</div>}
                        </button>
                    </div>

                </form>

                <div className='win-history-div'></div>
                <div className="nav-bar">
                    <BottomNavBar />
                </div>
            </div>
        </div>
    )
}
export default NumberPrediction