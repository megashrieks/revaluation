import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

class HintedInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
	}
	handleChange = ({ target: {value} }) => {
        this.setState(__ => {
            let check;
            if (!!this.props.test)
                check = this.props.test(value);
            else
                check = true;
            this.props.handleChange(value,check);
			return {
				value: value
			};
		});
	};
	render() {
		return <div className="input-field">
			<FormControl error={this.props.error}>
				<InputLabel>{this.props.placeholder}</InputLabel>
                <Input
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.handleChange} />
				<FormHelperText>{this.props.error && this.props.errorMsg}</FormHelperText>
			</FormControl>
		</div>;
	}
}

export default HintedInput;