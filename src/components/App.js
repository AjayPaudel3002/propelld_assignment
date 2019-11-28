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
		} else if (input_value === "not_earning") {
			this.setState({
				earning_value: input_value,
				earning: false,
				not_earning: true
			});
		}
    };
    
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
						></Application>
					)}
				></Route>
				<Route
					path='/co_application'
					render={props => <CoApplicationForm {...props}></CoApplicationForm>}
				></Route>
				<Route
					path='/congratulations'
					render={props => <Congratulations {...props}></Congratulations>}
				></Route>
				<Route
					path='/co_applicantkyc'
					render={props => <CoApplicantKyc {...props}></CoApplicantKyc>}
				></Route>
                <Route
					path='/applicant_kyc'
					render={props => <CoApplicantKyc {...props}></CoApplicantKyc>}
				></Route>
				<Route path='/documents' render={props => <Documents {...props}></Documents>}></Route>
			</React.Fragment>
		);
	}
}
