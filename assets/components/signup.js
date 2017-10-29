import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import FormFieldControl from '../controls/formFieldsControl';

const EmailList = {
    id: "rajesh.ece2eie@gmail.com",
    password: "12345"
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.onBlurEmail = this.onBlurEmail.bind(this);
        this.onBlurPassword = this.onBlurPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBlurFn = this.onBlurFn.bind(this);
        this.onBlurLn = this.onBlurLn.bind(this);
        this.onBlurPn = this.onBlurPn.bind(this);
        this.onBlurCPassword = this.onBlurCPassword.bind(this);
        this.state = {
            emailErrorStatus: "",
            passwordErrorStatus: "",
            fnErrorStatus: "",
            lnErrorStatus: "",
            pnErrorStatus: "",
            cPasswordErrorStatus: "",
            validEmail: "",
            password: ""
        }
    }
    onBlurEmail(e) {
        if(e.target.value === EmailList.id) {
            this.setState({
                emailErrorStatus: "error"
            });
        }
        else {
            this.setState({
                emailErrorStatus: "valid",
                validEmail: e.target.value
            });
        }
    }
    onBlurPassword(e) {
        this.setState({
            passwordErrorStatus: "valid",
            password: e.target.value
        });
    }
    onBlurFn(e) {
        this.setState({fnErrorStatus: "valid"});
    }
    onBlurLn(e) {
        this.setState({lnErrorStatus: "valid"});
    }
    onBlurPn(e) {
        this.setState({pnErrorStatus: "valid"});
    }
    onBlurCPassword(e) {
        if(e.target.value != "" && e.target.value === this.state.password) {
            this.setState({cPasswordErrorStatus: "valid"});
        }
        else {
            this.setState({cPasswordErrorStatus: "error"});
        }
    }
    onSubmit() {
        if(this.state.validEmail != "" && this.state.fnErrorStatus === "valid" && this.state.lnErrorStatus === "valid" && this.state.pnErrorStatus === "valid" && this.state.cPasswordErrorStatus === "valid") {
            console.log("Profile Created:", this.state.validEmail);
        }
    }
    render() {
        return (
            <form className="signUpSection">
                <ul>
                    <li>
                        <FormFieldControl 
                            type="text" 
                            placeholder="First Name" 
                            onBlur={this.onBlurFn} 
                            errorStatus={this.state.fnErrorStatus}
                            component="alpha" />
                    </li>
                    <li>
                        <FormFieldControl 
                            type="text" 
                            placeholder="Last Name" 
                            onBlur={this.onBlurLn} 
                            errorStatus={this.state.lnErrorStatus}
                            component="alpha" />
                    </li>
                    <li>
                        <FormFieldControl 
                            type="text" 
                            placeholder="Phone Number" 
                            onBlur={this.onBlurPn} 
                            errorStatus={this.state.pnErrorStatus}
                            component="number" />
                    </li>
                    <li>
                        <FormFieldControl 
                            type="email" 
                            placeholder="Email ID" 
                            onBlur={this.onBlurEmail} 
                            errorStatus={this.state.emailErrorStatus}
                            component="email" />
                    </li>
                    <li>
                        <FormFieldControl 
                            type="password" 
                            placeholder="Password" 
                            onBlur={this.onBlurPassword} 
                            errorStatus={this.state.passwordErrorStatus}
                            component="password"/>
                    </li>
                    <li>
                        <FormFieldControl 
                            type="password" 
                            placeholder="Confirm Password" 
                            onBlur={this.onBlurCPassword} 
                            errorStatus={this.state.cPasswordErrorStatus}
                            component="password"/>
                    </li>
                    <li className="clearfix">
                        <button type="button" onClick={this.onSubmit}>Sign Up</button>
                    </li>
                </ul>    
            </form>
        );
    }
}

export default SignUp;

SignUp.propTypes = {
    sendSignInData: PropTypes.func
}
 

