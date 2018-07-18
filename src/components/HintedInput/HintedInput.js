import React, { Component } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import "./HintedInput.css";
import { TextField } from "@material-ui/core";
class HintedInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if(this.props.value !== nextProps.value)
		this.setState({
			value:nextProps.value
		})
	}
	handleChange = ({ target: { value } }) => {
		this.setState(__ => {
			this.props.handleChange(value, false);
			return {
				value: value
			};
		});
	};
	handleError = ({ target: { value } }) => {
		this.setState(__ => {
			let check;
			if (!!this.props.test) check = this.props.test(value);
			else check = true;
			this.props.handleChange(value, check);
			return {
				value: value
			};
		});
	};
	render() {
		let defaultValue = this.props.defaultValue
			? { defaultValue: this.props.defaultValue }
			: null;
		return (
			<div className="input-field">
				<FormControl fullWidth error={this.props.error}>
					<TextField
						error={this.props.error}
						label={this.props.placeholder}
						InputLabelProps={this.props.inputlabelprops}
						{...defaultValue}
						type={this.props.type}
						value={this.state.value}
						onChange={this.handleChange}
						onBlur={this.handleError}
					/>
					<FormHelperText>
						{this.props.error && this.props.errorMsg}
					</FormHelperText>
				</FormControl>
			</div>
		);
	}
}

export default HintedInput;
