import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import daman_logo from '../asset/daman-logo.png'
import './Header.css'

function Header() {
    const navigate= useNavigate()
    return (
        <div className="header">
            <button className="back-btn" onClick={()=>{navigate(-1)}}>
                <FaAngleLeft size={24}/>
            </button>
            <div className="logo-div">
                <img src={daman_logo} height={"55px"} alt="" />
                <div>999</div>

            </div>
        </div>
    )
}

export default Header