import useApi from '../hooks/useApi'
import { API_URL } from '../config/urlConfig'
export default function ScamProtection({ userId }) {
    const api = useApi('POST', `${API_URL}/api/v1/admin/sum-log-balance?userId=${userId}`)
    const loading = api.stateLoading
    const data = api.stateData
    const error = api.stateError
    const apiCall = api.fetchData
    const handleClick = () => {
        apiCall()
    }
    return (
        <div>
            {
                error && alert(error.error)
            }
            <button onClick={handleClick}>
                {loading ? 'Loading...' : "View Activity"}
            </button>
            {
                data && <span> Activity is <b>{data.data.percentOfTotalDeposit} </b>% of Deposit, total activity {data.data.totalLogAmount}</span>

            }

        </div>
    )
}