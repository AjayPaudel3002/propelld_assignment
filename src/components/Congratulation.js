import React from "react"
import {  Link } from 'react-router-dom';

export default class Congratulations extends React.Component {
    render() {
        return (
            <div>
                <p className='text-center container'>
                    <img
                        className='mb-3 mt-4'
                        src='https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-check-mark-4.png'
                        alt='...'
                        style={{ width: "80px" }}
                    />
                    <h1 >Congratulations!</h1>
                    <h4 >You staisfy our minimum eligibility criteria for loan processing. Please complete your KYC and
                    document verfication process to complete the loan application.</h4>
                    <Link to="/co_applicantkyc" className="btn btn-secondary btn-lg  mt-5">CONTINUE</Link>
                </p>
            </div>
        );
    }
}
