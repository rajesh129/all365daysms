import React from 'react';
import PropTypes from 'prop-types';
import {validateEmail, validateAlphabet, validatePhoneNumber} from './formValidation';

class FormFieldControl extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.state = {
            errorStatus: "",
            value: ""
        }
    }
    onKeyPress(e) {
        this.props.onKeyPress && this.props.onKeyPress(e);
    }
    onBlur(obj) {
        this.props.onBlur && this.props.onBlur(obj);
        this.setState({
            errorStatus: "",
            value: obj.target.value
        });
        switch(this.props.component) {
            case "email":
                if(!validateEmail(obj.target.value)) {
                    this.setState({errorStatus: "error"});
                }
                else {
                    this.setState({errorStatus: "valid"});
                }
                break;
            case "password":
                if(obj.target.value === "") {
                    this.setState({errorStatus: "error"});
                }
                else {
                    this.setState({errorStatus: "valid"});
                }
                break;
            case "alpha":
                if(!validateAlphabet(obj.target.value)) {
                    this.setState({errorStatus: "error"});
                }
                else {
                    this.setState({errorStatus: "valid"});
                }
                break;
            case "number":
                if(!validatePhoneNumber(obj.target.value)) {
                    this.setState({errorStatus: "error"});
                }
                else {
                    this.setState({errorStatus: "valid"});
                }
                break;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.value === nextState.value)
            return false;
        
        return true;
    }
    render() {
        let element = "";
        let status = "";
        if(this.state.errorStatus === "valid" && this.props.errorStatus === "valid") {
            status = "valid";
        }
        else if(this.state.errorStatus === "" && this.props.errorStatus === "") {
            status = "";
        }
        else {
            status = "error";
        }
        switch(this.props.component) {
            case "password":
                element = (
                    <div className={"inputFieldWrapper " + status}>
                        <input type={this.props.type} placeholder={this.props.placeholder} onBlur={this.onBlur} onKeyPress={this.onKeyPress} maxLength={8} />
                        <span className="inputStatusBar" />
                    </div>
                );
                break;
            case "number":
                element = (
                    <div className={"inputFieldWrapper " + status}>
                        <input type={this.props.type} placeholder={this.props.placeholder} onBlur={this.onBlur} onKeyPress={this.onKeyPress}  maxLength={10} />
                        <span className="inputStatusBar" />
                    </div>
                );
                break;
            default:
                element = (
                    <div className={"inputFieldWrapper " + status}>
                        <input type={this.props.type} placeholder={this.props.placeholder} onBlur={this.onBlur} onKeyPress={this.onKeyPress}  />
                        <span className="inputStatusBar" />
                    </div>
                );
        }
        return (
            element
        );
    }
}

FormFieldControl.propTypes = {
    type: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    errorStatus: PropTypes.string,
    status: PropTypes.func
}

export default FormFieldControl;

