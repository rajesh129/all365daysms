import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import MainPage from './components/mainpage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.sendSignInData = this.sendSignInData.bind(this);
        this.state = {
            loginDetails: {
                isLoginSuccess: false,
                emailAddress: "", 
                firstName: "", 
                lastName: ""
            }
        }
    }
    sendSignInData(isLoginSuccess, emailAddress, firstName, lastName) {
        let loginDetails = {
            isLoginSuccess: isLoginSuccess,
            emailAddress: emailAddress, 
            firstName: firstName, 
            lastName: lastName
        }
        this.setState({loginDetails});
    }
    render() {
        let page = "";
        debugger;
        if(this.state.loginDetails.isLoginSuccess) {
            page = <MainPage loginDetails={this.state.loginDetails} />
        }
        else {
            page = <Login sendSignInData={this.sendSignInData} />
        }
        return (
            page
        );
    }
}

export default App;