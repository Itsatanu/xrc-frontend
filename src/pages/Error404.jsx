import React from "react";
import { NavLink } from "react-router-dom";
import ErrorImg from '../asset/404.jpg'
import './Error404.css'
function Error404(){
    return (
        <div className="error-div">
            <div className="error-heading">Sorry</div>
            <div className="error-sub-heading-one">We couldn't find that pages</div>
            <div className="error-sub-heading-two"><NavLink to={'/'} style={{color:'red'}}>Go to Home Page</NavLink></div>
            <div className="error-img-div"><img  src={ErrorImg} alt="" style={{height:"50vh"}} /></div>
        </div>
    );
}
export default Error404