import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Documents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			front_image_url: "",
			back_image_url: ""
		};
	}
	upload_document = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	get_result = e => {
		console.log(this.state.front_image_url);
		if (this.state.front_image_url !== "" && this.state.back_image_url !== "") {
			axios({
				method: "POST",
				url: "http://localhost/hack/2019/verification/aadhaar/extract",
				data: {
					front_image_url: this.state.front_image_url,
					back_image_url: this.state.back_image_url
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
			this.props.history.push("/final");
		} else if (this.state.front_image_url === "" && this.state.back_image_url === "") {
			alert("Please fill details");
		}
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
                                        name = "front_image_url"
										placeholder=''
										value={this.state.front_image_url}
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
                                        name= "back_image_url"
										placeholder=''
										value={this.state.back_image_url}
										onChange={this.upload_document}
									/>
								</div>
							</div>
							<button
                                class='btn btn-secondary'
                                type="button"
								onClick={() => {
									let finalObject = {};
									Object.keys(this.state).forEach(key => {
										finalObject[key] = this.state[key];
									});
                                    this.props.set_final(finalObject);
                                    this.get_result()
								}}
							>
								Finish
							</button>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
