import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import SignIn from './signin';
import SignUp from './signup';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.sendSignInData = this.sendSignInData.bind(this);
    }

    sendSignInData(isLoginSuccess, emailAddress, firstName, lastName) {
        this.props.sendSignInData && this.props.sendSignInData(isLoginSuccess, emailAddress, firstName, lastName);
    }

    render() {
        return (
            <section className="loginPage">
                <div className="loginContainer">
                    <h1>All 365 Days Login</h1>
                    <SignIn sendSignInData={this.sendSignInData} />
                    <SignUp />
                </div>
            </section>
        );
    }
}

export default Login;

Login.propTypes = {
    sendSignInData: PropTypes.func
}
