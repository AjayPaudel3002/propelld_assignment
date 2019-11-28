import React from "react";
import axios from "axios";
import { Route, Redirect, Link } from "react-router-dom";

export default class CoApplicantKyc extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			phone: "",
			yes: false,
			no: false
		};
	}
	check_phone = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	get_status = e => {
		const object = {
			phone: this.state.phone
		};
		this.setState({
			yes: true,
			no: false
		});
	};
	get_phone_number = e => {
		alert("KYC Verification Done");
	};

	get_status1 = e => {
		this.setState({
			no: true,
			yes: false
		});
	};

	render() {
		return (
			<div>
				<div
					className='container'
					style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "18px", marginTop: "10%" }}
				>
					<div className='row'>
						<h3>Is Applicant Aadhar linked to Moblie Number ?</h3>
					</div>
					<div>
						{this.state.yes === false ? (
							<input type='radio' name='yes' value={this.state.yes} onClick={this.get_status} />
						) : (
							<input
								type='radio'
								name='yes'
								value={this.state.yes}
								onClick={this.get_status}
								checked
							/>
						)}{" "}
						YES<br></br>
						{this.state.no === false ? (
							<input type='radio' name='no' value={this.state.no} onClick={this.get_status1} />
						) : (
							<input
								type='radio'
								name='no'
								value={this.state.no}
								onClick={this.get_status}
								checked
							/>
						)}{" "}
						NO<br></br>
					</div>
                    <br></br>
                    <br></br>
					{this.state.yes ? (
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co Applicants Adhar Linked Mobile Number
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
                                    class='form-control form-control-lg'
                                    name = "phone"
									placeholder=''
									value={this.state.phone}
									onChange={this.check_phone}
								/>
								<Link
									to='/documents'
									class='btn btn-secondary btn-lg mt-5'
									onClick={this.get_phone_number}
								>
									CHECK
								</Link>
							</div>
						</div>
					) : null}

					{this.state.no ? (
						<div className='container-fluid'>
							<div className='row '>
								<Link
									to='/documents'
									class='btn btn-secondary btn-lg mt-5'
									onClick={this.get_status1}
								>
									PROCEED TO KYC
								</Link>
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
