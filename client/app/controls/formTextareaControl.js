import React from 'react';
import PropTypes from 'prop-types';
import {validateEmail, validateAlphabet, validatePhoneNumber} from './formValidation';

class FormTextAreaControl extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(obj) {
        this.props.onChange && this.props.onChange(obj);
    }
    render() {
        return (
            <div className="textAreaWrapper">
                <textarea onChange={this.onChange}/>
            </div>
        );
    }
}

FormTextAreaControl.propTypes = {
    onChange: PropTypes.func
}

export default FormTextAreaControl;

