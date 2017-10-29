import React from 'react';
import PropTypes from 'prop-types';
import {validateEmail, validateAlphabet, validatePhoneNumber} from './formValidation';

class FormRadioControl extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            errorStatus: "",
            value: ""
        }
    }
    onClick(obj) {
        this.props.onClick && this.props.onClick(obj);
        this.setState({
            errorStatus: "",
            value: obj.target.value
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.value === nextState.value)
            return false;
        
        return true;
    }
    render() {
        const {
            radioId,
            name,
            text,
            defaultChecked
        } = this.props;
        return (
            <div className="radioBoxWrapper">
                <label htmlFor={radioId} >
                    <input 
                        type="radio" 
                        id={radioId} 
                        name={name} 
                        onClick={this.onClick} 
                        value={text} 
                        defaultChecked={defaultChecked != undefined || defaultChecked != "" ? defaultChecked : false} />
                    <span><i>{text}</i></span>
                </label>
            </div>
        );
    }
}

FormRadioControl.propTypes = {
    radioId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    onChange: PropTypes.func,
    errorStatus: PropTypes.string,
    status: PropTypes.func,
    defaultChecked: PropTypes.bool
}

export default FormRadioControl;

