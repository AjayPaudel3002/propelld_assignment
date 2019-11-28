import React from "react";
import axios from "axios";

export default class NotEarning extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pan_number: "",
			name: "",
			pan_details: [],
			iam: 0,
			not_earnings: []
		};
	}
	get_api = pan => {
		axios({
			method: "POST",
			url: "https://localhost/hack/verification/pan/fetch",
			data: {
				PANNumber: this.state.pan_number
			}
		})
			.then(response => {
                console.log(response.data.PayLoad);
                this.setState({
                    pan_details:response.data.PayLoad
                })
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

	get_pan_details = e => {
		this.setState({
			pan_number: e.target.value
		});
		if (e.target.value.length === 10) {
			this.get_api(e.target.value);
		}
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

	proceed = () => {
			this.props.history.push("/co_application");
	};

	render() {
		return (
			<React.Fragment>
				<div className='container'>
					<div class='jumbotron jumbotron-fluid'>
						<div class='container'>
							<p class='lead'>
								We will be needing a Co-Applicant for your loan application in the next step.
							</p>
						</div>
					</div>
					<form>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								PAN No
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
									value={this.state.pan_number}
									onChange={this.get_pan_details}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Name
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
									value={this.state.pan_details.Name}
									onChange={e => {
										this.setState({
											name: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								I am
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
									value={this.getAge()}
									onChange={e => {
										this.setState({
											iam: e.target.value
										});
									}}
								/>
							</div>
							<button
								type='button'
								className='btn btn-secondary btn-lg'
								onClick={() => {
									this.proceed();
								}}
							>
								Proceed To Co applicant
							</button>
						</div>
					</form>
				</div>
			</React.Fragment>
		);
	}
}
