import React from 'react';
import PropTypes from 'prop-types';
import {validateEmail, validateAlphabet, validatePhoneNumber} from './formValidation';

class FormSelectBoxControl extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            errorStatus: "",
            value: ""
        }
    }
    onChange(obj) {
        this.props.onChange && this.props.onChange(obj);
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
            options,
            name,
            text
        } = this.props;
        let getOption = this.props.options.map(function(item, index) {
            return (<option key={index} value={item.value}>
                {item.value}
            </option>)
        });
        return (
            <div className="selectBoxWrapper">
                <select onChange={this.onChange}>
                    <option value="Please Select">Please Select</option>
                    {getOption}
                </select>
            </div>
        );
    }
}

FormSelectBoxControl.propTypes = {
    options: PropTypes.any.isRequired,
    onChange: PropTypes.func
}

export default FormSelectBoxControl;

