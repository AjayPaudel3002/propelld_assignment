import React from "react";
import Earnings from "./Earnings"
import NotEarning from "./NotEarnings";
export default class Application extends React.Component {
	// constructor(props) {
	// 	super(props);
		
	// }
	render() {
		// console.log(this.state.earning);
		// console.log(this.state.not_earning);
		return (
			<React.Fragment>
				<div className='container'>
					<br></br>
					<br></br>
					<form>
						<div class='form-group row'>
							<label for='staticEmail' class='col col-form-label-lg'>
								Student is
							</label>
							<div class='col-sm-10'>
								<div class='form-check form-check-inline'>
									{this.props.earning === true  ? (
										<input
											class='form-check-input'
											type='radio'
											name='inlineRadioOptions'
											id='earning'
											checked = {this.props.earning}
											// value={this.props.earning_value}
											onClick={() => {
												this.props.change_earning_value("earning");
												
											}}
										/>
									) : (
										<input
											class='form-check-input'
											type='radio'
											name='inlineRadioOptions'
                                            id='earning'
                                            checked = {this.props.earning}
											// value={this.props.earning_value}
											onClick={() => {
												this.props.change_earning_value("earning");
												
											}}
										/>
									)}
									<label class='form-check-label' for='inlineRadio1'>
										Earning
									</label>
								</div>
								<div class='form-check form-check-inline'>
									{this.props.earning === false ? (
										<input
											class='form-check-input'
											type='radio'
                                            id='not_earning'
                                            checked = {this.props.not_earning}
											onClick={e => {
												this.props.change_earning_value("not_earning");
												
											}}
										/>
									) : (
										<input
											class='form-check-input'
											type='radio'
                                            id='not_earning'
                                            checked = {this.props.not_earning}
											onClick={e => {
												this.props.change_earning_value("not_earning");
											}}
										/>
									)}
									<label class='form-check-label' for='inlineRadio1'>
										Not Earning
									</label>
								</div>
							</div>
						</div>
					</form>
                   {this.props.earning ? <Earnings {...this.props}></Earnings> : <NotEarning {...this.props}></NotEarning>}
				</div>
			</React.Fragment>
		);
	}
}
