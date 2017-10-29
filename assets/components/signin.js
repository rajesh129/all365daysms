import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import FormFieldControl from '../controls/formFieldsControl';

const EmailList = {
    id: "rajesh.ece2eie@gmail.com",
    password: "12345",
    firstName: "Rajesh",
    lastName: "Pandian"
}

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.onBlurEmail = this.onBlurEmail.bind(this);
        this.onBlurPassword = this.onBlurPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendSignInData = this.sendSignInData.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.state = {
            emailErrorStatus: "",
            passwordErrorStatus: "",
            validEmail: "",
            isLoginSuccess: false,
            firstName: "",
            lastName: ""
        }
    }
    onKeyPress(e) {
        if(e.key === "Enter") {
            this.onSubmit();
        }
    }
    onBlurEmail(e) {
        if(e.target.value === EmailList.id) {
            this.setState({
                emailErrorStatus: "valid",
                validEmail: e.target.value,
                firstName: EmailList.firstName,
                lastName: EmailList.lastName
            });
        }
        else {
            this.setState({
                emailErrorStatus: "error",
                errorMsg: "Email entered is incorrect."
            });
        }
    }
    onBlurPassword(e) {
        if(e.target.value === EmailList.password) {
            this.setState({passwordErrorStatus: "valid"});
        }
        else {
            this.setState({
                passwordErrorStatus: "error",
                errorMsg: "Password entered is incorrect."
            });
        }
    }
    onSubmit() {
        if(this.state.validEmail != "" && this.state.passwordErrorStatus === "valid") {
            console.log("Login Success:", this.state.validEmail);
            this.setState({isLoginSuccess: true});
            this.sendSignInData(true, this.state.validEmail, this.state.firstName, this.state.lastName);
        }
        else {
            if(this.state.passwordErrorStatus != "valid" || this.state.emailErrorStatus != "valid") {
                this.setState({
                    errorMsg: "Login Failed."
                });
            }
            this.setState({isLoginSuccess: false});
        }
    }
    sendSignInData(isLoginSuccess, emailAddress, firstName, lastName) {
        this.props.sendSignInData && this.props.sendSignInData(isLoginSuccess, emailAddress, firstName, lastName);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.validEmail === nextState.validEmail && this.state.passwordErrorStatus === nextState.passwordErrorStatus && nextState.errorMsg === "" )
            return false;
        
        return true;
    }
    render() {
        return (
            <form className="signInSection" onSubmit={this.onSubmit}>
                <ul>
                    <li>
                        <FormFieldControl 
                            type="email" 
                            placeholder="Email ID" 
                            onBlur={this.onBlurEmail} 
                            errorStatus={this.state.emailErrorStatus}
                            onKeyPress={this.onKeyPress}
                            component="email" />
                    </li>
                    <li>
                        <FormFieldControl 
                            type="password" 
                            placeholder="Password" 
                            onBlur={this.onBlurPassword} 
                            errorStatus={this.state.passwordErrorStatus}
                            onKeyPress={this.onKeyPress}
                            component="password" />
                    </li>
                    <li className="clearfix">
                        <a href="#" className="forgotPasswordLink">forgot password</a>
                    </li>
                    <li className="clearfix">
                        <button type="button" onClick={this.onSubmit}>Sign In</button>
                    </li>
                </ul>
                <span className="errorMsg">{this.state.errorMsg}</span>    
            </form>
        );
    }
}

export default SignIn;

SignIn.propTypes = {
    sendSignInData: PropTypes.func
}
 

