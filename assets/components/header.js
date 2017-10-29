import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

class HeaderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="clearfix">
                <div className="profileDetails">{"Hi " + this.props.firstName + "!"}</div>
            </header>
        );
    }
}

export default HeaderPage;

HeaderPage.propTypes = {
    firstName: PropTypes.string
}