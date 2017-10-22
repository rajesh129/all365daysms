import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import HeaderPage from './header';
import SendSMS from './sendSms/sendSMS'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.loginDetails);
        return (
            <section className="mainPage">
                <HeaderPage firstName={this.props.loginDetails.firstName}  />
                <SendSMS />
            </section>
        );
    }
}

export default MainPage;

MainPage.propTypes = {
    loginDetails: PropTypes.object
}