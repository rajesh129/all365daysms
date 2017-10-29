import React from 'react';
import PropTypes from 'prop-types';

class FormCheckboxControl extends React.Component {
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
            id,
            name,
            text,
            defaultChecked
        } = this.props;
        return (
            <div className="checkBoxWrapper">
                <label htmlFor={id} >
                    <input 
                        type="checkbox" 
                        id={id} 
                        name={name} 
                        onClick={this.onClick} 
                        value={text} 
                        defaultChecked={defaultChecked != undefined || defaultChecked != "" ? defaultChecked : false} />
                    <span>{text}</span>
                </label>
            </div>
        );
    }
}

FormCheckboxControl.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    onChange: PropTypes.func,
    errorStatus: PropTypes.string,
    status: PropTypes.func,
    defaultChecked: PropTypes.bool
}

export default FormCheckboxControl;

