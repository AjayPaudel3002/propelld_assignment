import React from "react";
import axios from "axios";

export default class CoApplicationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			relationship_co_app: "",
			pan_details: {},
			co_pan_num: "",
			co_app_name: "",
			co_app_is: 0,
			employment_type: "",
			profession_is: "",
			co_app_earning: 0,
			co_app_income: 0,
			co_app_emi: 0,
			co_app_mon: 0
		};
	}
	get_api = pan => {
		axios({
			method: "POST",
			url: "http://localhost/hack/2019/verification/pan/fetch",
			data: {
				PANNumber: pan
			}
		})
			.then(response => {
				console.log(response.data.PayLoad);
				this.setState({
					pan_details: response.data.PayLoad
				});
			})
			.catch(error => {
				let PayLoad = {};
				PayLoad.Name = "SAADHASSAN";
				PayLoad.DateOfBirth = "04/08/1996";
				PayLoad.FatherName = "SYED NAYYAR HASAN";
				PayLoad.PANNumber = "AIOPH7866F";
				this.setState({
					pan_details: PayLoad
				});
			});
	};

	getAge = () => {
		if (this.state.pan_details.PANNumber !== undefined) {
			var today = new Date();
			var birthDate = new Date(this.state.pan_details.DateOfBirth);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age = age - 1;
			}
			return age;
		}
	};

	get_pan_details = e => {
		this.setState({
			pan_number: e.target.value
		});
		if (e.target.value.length === 10) {
			this.get_api(e.target.value);
		}
	};

	// check_eligibility = () => {
		
	// 		return (
	// 			<div class='modal' tabindex='-1' role='dialog'>
	// 				<div class='modal-dialog' role='document'>
	// 					<div class='modal-content'>
	// 						<div class='modal-header'>
	// 							<h5 class='modal-title'>Modal title</h5>
	// 							<button type='button' class='close' data-dismiss='modal' aria-label='Close'>
	// 								<span aria-hidden='true'>&times;</span>
	// 							</button>
	// 						</div>
	// 						<div class='modal-body'>
	// 							<p>Modal body text goes here.</p>
	// 						</div>
	// 						<div class='modal-footer'>
	// 							<button type='button' class='btn btn-primary'>
	// 								Save changes
	// 							</button>
	// 							<button type='button' class='btn btn-secondary' data-dismiss='modal'>
	// 								Close
	// 							</button>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		);

	// };

	render() {
		console.log(this.state.relationship_co_app);
		return (
			<React.Fragment>
				<div className='container'>
					<form>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Relationship with Co-Applicant
							</label>
							<div class='col-sm-10'>
								<input
                                    type='text'
                                    required
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.state.relationship_co_app}
									onChange={e => {
										this.setState({
											relationship_co_app: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co-Applicants PAN No
							</label>
							<div class='col-sm-10'>
								<input
                                    type='text'
                                    required
									class='form-control form-control-lg'
									placeholder=''
									value={this.state.pan_number}
									onChange={this.get_pan_details}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co-Applicants Name
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.state.pan_details.Name}
									onChange={e => {
										this.setState({
											co_app_name: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co-Applicants Is
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.getAge()}
									onChange={e => {
										this.setState({
											co_app_is: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Employment type
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.state.employment_type}
									onChange={e => {
										this.setState({
											employment_type: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Profession Is
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.state.profession_is}
									onChange={e => {
										this.setState({
											profession_is: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co Applicant is earning for
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.state.co_app_earning}
									onChange={e => {
										this.setState({
											co_app_earning: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<small id='emailHelp' class='form-text text-muted'>
							Please note that this will be verified from your bank statement.
						</small>
						<br></br>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co Applicant is working at
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.state.working_at}
									onChange={e => {
										this.setState({
											working_at: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<small id='emailHelp' class='form-text text-muted'>
							Please note that this will be verified from your CIBL and Bank statement.
						</small>
						<br></br>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co Applicant monthly income of
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
                                    value={this.state.co_app_income}
                                    required
									onChange={e => {
										this.setState({
											co_app_income: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co Applicant paying EMI of
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.state.co_app_emi}
									onChange={e => {
										this.setState({
											co_app_emi: e.target.value
										});
									}}
								/>
							</div>
						</div>
                        <div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Co Applicant Mobile
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
                                    placeholder=''
                                    required
									value={this.state.co_app_mon}
									onChange={e => {
										this.setState({
											co_app_mon: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<button
							type='button'
							className='btn btn-secondary btn-lg'
							 onClick = {()=>{this.props.history.push(`/congratulations`)}}
						>
							Check Eligibility
						</button>
					</form>
				</div>
			</React.Fragment>
		);
	}
}
