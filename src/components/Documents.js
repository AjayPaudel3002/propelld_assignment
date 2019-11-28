import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Documents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			FrontImageUrl: "",
			BackImageUrl: ""
		};
	}
	upload_document = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	get_result = e => {
		const FrontImageUrl = { FrontImageUrl: this.state.FrontImageUrl };
		const BackImageUrl = { BackImageUrl: this.state.BackImageUrl };
		console.log(this.state);

		axios({
			method: "POST",
			url: "http://localhost/hack/2019/verification/aadhaar/extract",
			data: {
				FrontImageUrl: this.state.FrontImageUrl,
				BackImageUrl: this.state.BackImageUrl
			}
		})
			.then(response => {
				console.log(response.data);
				console.log(response.data.PayLoad);
				const object = {
					PayLoad: response.data.PayLoad
				};
				this.setState({
					array: [...this.state.array, object]
				});
			})
			.catch(err => alert(err));
	};

	render() {
		return (
			<React.Fragment>
				<br></br>
				<br></br>
				<div className='container'>
					<h3>USER AADHAR IMAGE URL</h3>
                    <br></br>
					<div className='row'>
						<br></br>
						<form>
							<div class='form-group row'>
								<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
									Front Image
								</label>
								<div class='col-sm-10'>
									<input
										type='file'
										class='form-control form-control-lg'
										placeholder=''
										value={this.state.FrontImageUrl}
										onChange={this.upload_document}
									/>
								</div>
							</div>
							<div class='form-group row'>
								<label for='colFormLabelLg' class='col-sm-2 col-form-label col-form-label-lg'>
									Back Image
								</label>
								<div class='col-sm-10'>
									<input
										type='file'
										class='form-control form-control-lg'
										placeholder=''
										value={this.state.FrontImageUrl}
										onChange={this.upload_document}
									/>
								</div>
							</div>
							<button class='btn btn-secondary' onClick={this.get_result}>
								Finish
							</button>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
