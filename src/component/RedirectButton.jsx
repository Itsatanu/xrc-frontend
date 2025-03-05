import { useNavigate } from "react-router-dom"

function RedirectButton({ title, onClick, styles, redirectPath }) {
    let navigate = useNavigate()
    return (
        <button
            style={styles?styles:{}}
            onClick={() => {
                onClick?onClick:""
                navigate(redirectPath)
            }}>
            {title}
        </button>
    )
}
export default RedirectButton