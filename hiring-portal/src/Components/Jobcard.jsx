import React from "react";
import "../CSS/jobcard.css";
import logo from "../logo.png";

const Jobcard = ({ company, rating, reviews, role }) => {
    return (
        <div className="jobcard">
            <div className="joblogo"><img src={logo} alt="company logo" /></div>
            <div className="comname">{company}</div>
            <div className="rate">
                <div className="rating">{rating}</div>
                <div className="review">{reviews}</div>
            </div>
            <div className="role">{role}</div>
            <div className="viewjob"><button>View Job</button></div>
        </div>
    );
};

export default Jobcard;