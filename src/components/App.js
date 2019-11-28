import React from "react";
import { Route } from "react-router-dom";
import Application from "./Application";
import CoApplicationForm from "./CoApplicationInform";
import Congratulations from "./Congratulation";
import CoApplicantKyc from "./CoApplicantKyc";
import Documents from "./Documents";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			earning_value: "earning",
			earning: true,
            not_earning: false,
            final_result:{}
		};
	}

	change_earning_value = input_value => {
		if (input_value === "earning") {
			this.setState({
				earning_value: input_value,
				earning: true,
				not_earning: false
			});
			this.set_final({ name : "earning_value", value : input_value});
		} else if (input_value === "not_earning") {
			this.setState({
				earning_value: input_value,
				earning: false,
				not_earning: true
			});
			this.set_final({ name : "earning_value", value : input_value});
		}
	};
	
	set_final = (finalObj) => {
		if(finalObj){
			this.setState({
				final_result : {...this.state.final_result, ...finalObj},
			})
		}
	}
    
    get_final=(data)=>{
        this.setState({
            final_result : {...data}
        })
    }

	render() {
		console.log(this.state.final_result);
		return (
			<React.Fragment>
				<Route
					path='/'
					exact
					render={props => (
						<Application
							change_earning_value={this.change_earning_value}
							earning_value={this.state.earning_value}
							{...props}
							earning={this.state.earning}
                            not_earning={this.state.not_earning}
                            get_final = {this.get_final}
							final_result= {this.state.final_result}
							set_final={this.set_final}
						></Application>
					)}
				></Route>
				<Route
					path='/co_application'
					render={props => <CoApplicationForm set_final={this.set_final} {...props}></CoApplicationForm>}
				></Route>
				<Route
					path='/congratulations'
					render={props => <Congratulations set_final={this.set_final} {...props}></Congratulations>}
				></Route>
				<Route
					path='/co_applicantkyc'
					render={props => <CoApplicantKyc set_final={this.set_final} {...props}></CoApplicantKyc>}
				></Route>
                <Route
					path='/applicant_kyc'
					render={props => <CoApplicantKyc set_final={this.set_final} {...props}></CoApplicantKyc>}
				></Route>
				<Route path='/documents' render={props => <Documents set_final={this.set_final} {...props}></Documents>}></Route>
				<Route path='/final' render={(props) => {
					return (
						<div>
							{JSON.stringify(this.state.final_result)}
						</div>
					)
				}
				} ></Route>
			</React.Fragment>
		);
	}
}
