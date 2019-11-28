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
			emi_paying: 0,
			iam: "",
			name: "",
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
					pan_details: PayLoad,
					name : PayLoad.Name,
				}, () => {
					let age = this.getAge();
					this.setState({iam : age});
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
		let isErrorsFound = this.checkIsAllFieldsFilled();
		console.log("isErrorsFound", isErrorsFound)
		if(isErrorsFound.length){
			alert("Oops , Form validation failed, please fill the necessary details");
			this.setState({ errors : isErrorsFound});
			return;
		}
        if(this.state.emi_paying > amt ){
			this.props.history.push(`/co_application`)
			this.props.get_final(this.state);
			let finalObject = {};
			Object.keys(this.state).forEach(key => {
				finalObject[key] = this.state[key]
			})
			this.props.set_final(finalObject);
        }
        else if(this.state.emi_paying < amt ){
			this.props.history.push(`/applicant_kyc`)
			this.props.get_final(this.state);
			let finalObject = {};
			Object.keys(this.state).forEach(key => {
				finalObject[key] = this.state[key]
			})
			this.props.set_final(finalObject);
        }
        else{
			alert("please fill")
        }       
    }
	
	checkIsAllFieldsFilled = () => {
		let keysToBeChecked = ['pan_number', 'name', 'iam', 'iama', 'professional', 'earning_for', 'working_at', 'income', 'emi_paying'];
		let errorArray = [];
		let stateKeys = Object.keys(this.state);
		for(let i in stateKeys){ 
			let key = stateKeys[i];
			if(keysToBeChecked.includes(key)){
				if(this.state[key] == undefined || this.state[key].length == 0 || this.state[key] == ""){
					errorArray.push({ errorField : key, errorMessage : `${key} is missing`});
					continue;
				}
				if(key == 'pan_number'){
					if(this.state[key].length < 10){
						errorArray.push({ errorField : key, errorMessage : `${key} is not valid`});
						continue;
					}
				}
				if(key == 'iam'){
					if(this.state[key] < 0){
						errorArray.push({ errorField : key, errorMessage : `age is not valid`});
						continue;
					}
				}
				if(key == 'earning_for'){
					if(this.state[key] < 0){
						errorArray.push({ errorField : key, errorMessage : `Earning For years is not valid`});
						continue;
					}
				}
				if(key == 'income'){
					if(this.state[key] <= 0){
						errorArray.push({ errorField : key, errorMessage : `${key} is not valid`});
						continue;
					}
				}
				if(key == 'emi_paying'){
					if(this.state[key] < 0){
						errorArray.push({ errorField : key, errorMessage : `Emi is not valid`});
						continue;
					}
					if(this.state['income'] && this.state['income'] < this.state[key]){
						errorArray.push({ errorField : key, errorMessage : `Emi is larger than income`});
						continue;
					}
				}
			}
		}
		console.log("this.state", this.state);
		return errorArray;
	}

	render() {
        console.log(this.props.final_result)
		return (
			<React.Fragment>
				<div className='container'>
					<div className="errors"> 
						{this.state.errors && this.state.errors.map(error => {
							return (
							<p style={{color : 'red'}}> {error.errorMessage} </p>
							)
						})}
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
									type='number'
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
									type='number'
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
									type='number'
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
