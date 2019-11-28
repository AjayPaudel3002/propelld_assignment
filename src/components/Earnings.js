import React from "react";
import axios from "axios";

export default class Earnings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pan_number: "",
			pan_details: {},
			iama: "",
			professional: "",
			earning_for: 0,
			working_at: "",
			income: 0,
			emi_paying: 0
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
    
    check_eligibility = ()=>{
        let amt = (this.state.income * 50/100)
        if(this.state.emi_paying > amt ){
            this.props.history.push(`/co_application`)
            this.props.get_final(this.state)
        }
        else if(this.state.emi_paying < amt ){
            this.props.history.push(`/applicant_kyc`)
            this.props.get_final(this.state)
        }
        else{
            alert("please fill")
        }       
    }

	render() {
        console.log(this.props.final_result)
		return (
			<React.Fragment>
				<div className='container'>
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
									type='number'
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
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								I am a
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
									value={this.state.iama}
									onChange={e => {
										this.setState({
											iama: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								My Progessional is
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
									value={this.state.professional}
									onChange={e => {
										this.setState({
											professional: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								I have been earning for
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
									value={this.state.earning_for}
									onChange={e => {
										this.setState({
											earning_for: e.target.value
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
								I am working at
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
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
								I have a monthly income of
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
									value={this.state.income}
									onChange={e => {
										this.setState({
											income: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<div class='form-group row'>
							<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
								Currently paying EMI of
							</label>
							<div class='col-sm-10'>
								<input
									type='text'
									class='form-control form-control-lg'
									placeholder=''
									value={this.state.emi_paying}
									onChange={e => {
										this.setState({
											emi_paying: e.target.value
										});
									}}
								/>
							</div>
						</div>
						<button type='button' className='btn btn-secondary btn-lg' onClick = {()=>{this.check_eligibility()}}>
							Check Eligibility
						</button>
					</form>
				</div>
			</React.Fragment>
		);
	}
}
