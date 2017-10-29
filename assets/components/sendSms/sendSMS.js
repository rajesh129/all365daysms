import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
//import Datetime from 'react-datetime';
import FormRadioControl from '../../controls/formRadioControl';
import FormSelectBoxControl from '../../controls/formSelectBoxControl';
import TextAreaControl from '../../controls/formTextareaControl';
import FormCheckboxControl from '../../controls/formCheckboxControl'
import {validateNumber, validateLineBreak} from '../../controls/formValidation';

const senderID = [
    {id: 1, value: "Rajesh"},
    {id: 2, value: "Anonymous"}
];

const chooseLanguage = [
    {id: 1, value: "English"},
    {id: 2, value: "Other"}
];

const maxMessages = 6;

class SendSMS extends React.Component {
    constructor(props) {
        super(props);
        this.onSmsTypeChange = this.onSmsTypeChange.bind(this);
        this.onSenderidSubmit = this.onSenderidSubmit.bind(this);
        this.senderidChange = this.senderidChange.bind(this);
        this.onRecipientsChange = this.onRecipientsChange.bind(this);
        this.onRecipientSubmit = this.onRecipientSubmit.bind(this);
        this.resetAllData = this.resetAllData.bind(this);
        this.openWarningBox = this.openWarningBox.bind(this);
        this.showErrorMsg = this.showErrorMsg.bind(this);
        this.onMessagesChange = this.onMessagesChange.bind(this);
        this.onMessagesSubmit = this.onMessagesSubmit.bind(this);
        this.chooseLanguage = this.chooseLanguage.bind(this);
        this.messageScheduled = this.messageScheduled.bind(this);
        this.senderid = "";
        this.recipients = "";
        this.messages = "";
        this.state = {
            sendSmsActions: {
                smsType: {
                    isSmsTypeActive: false,
                    smsType: ""
                },
                senderid: {
                    isSenderidActive: false,
                    isSenderisReq: false,
                    senderidValue: ""
                },
                recipients: {
                    isRecipientsActive: false,
                    recipientCount: 0,
                    recipients: ""
                },
                messages: {
                    isMessagesActive: false,
                    messagesCount: 0,
                    messages: "",
                    messagesCharLimit: 160,
                    chooseLanguage: "English",
                    isMessageScheduled: false
                },
                nextStep: ""
            },
            errorMsgHide: {
                hide: "",
                text: ""
            },
            warningBox: {
                show: "",
                content: ""
            }
        }
    }

    resetAllData() {
        let state = {
            sendSmsActions: {
                smsType: {
                    isSmsTypeActive: false,
                    smsType: ""
                },
                senderid: {
                    isSenderidActive: false,
                    isSenderisReq: false,
                    senderidValue: ""
                },
                recipients: {
                    isRecipientsActive: false,
                    recipientCount: 0,
                    recipients: ""
                },
                messages: {
                    isMessagesActive: false,
                    messagesCount: 0,
                    messages: "",
                    messagesCharLimit: 160,
                    chooseLanguage: "English",
                    isMessageScheduled: false
                },
                nextStep: ""
            },
            errorMsgHide: {
                hide: "",
                text: ""
            },
            warningBox: {
                show: "",
                content: ""
            }
        }
        this.setState(state);
        this.senderid = "";
        this.recipients = "";
        this.messages = "";
    }

    onSmsTypeChange(e) {
        let sendSmsActions = this.state.sendSmsActions;
        sendSmsActions.smsType.isSmsTypeActive = true;
        sendSmsActions.smsType.smsType = e.target.value;
        sendSmsActions.nextStep = "senderid";
        
        if(e.target.value === "Transactional") {
            sendSmsActions.senderid.isSenderisReq = true;
        }
        else {
            sendSmsActions.senderid.isSenderisReq = false;
        }

        this.setState({sendSmsActions: sendSmsActions});
    }

    senderidChange(e) {
        let sendSmsActions = this.state.sendSmsActions;
        if(this.state.sendSmsActions.senderid.isSenderidActive) {
            this.openWarningBox(); 
        }
        else {
            sendSmsActions.senderid.senderidValue = e.target.value;
            this.setState({sendSmsActions: sendSmsActions});
        }
            
    }
    showErrorMsg(msg) {
        let errorMsgHide = this.state.errorMsgHide;
        errorMsgHide.hide = "show";
        errorMsgHide.text = msg;
        this.setState({errorMsgHide: errorMsgHide});
        let _this = this;
        setTimeout(function() {
            errorMsgHide.hide = "";
            errorMsgHide.text = "";
            _this.setState({errorMsgHide: errorMsgHide});
        }, 2000);
    }
    onSenderidSubmit() {
        let sendSmsActions = this.state.sendSmsActions;
        if(!sendSmsActions.senderid.isSenderidActive) {
            if(this.state.sendSmsActions.senderid.isSenderisReq && this.state.sendSmsActions.senderid.senderidValue === "") {
                this.showErrorMsg("Please select sender id");
            }
            else {
                sendSmsActions.senderid.isSenderidActive = true;
                sendSmsActions.nextStep = "recipients";
                this.setState({sendSmsActions: sendSmsActions});
            }
        }
        else {
            this.openWarningBox();
        }        
    }

    openWarningBox() {
        let warningBox = this.state.warningBox;
        warningBox.show = "show";
        warningBox.content = (
            <div className="warningBoxContainer">
                <p>You are trying to edit previous steps. This will erase all the steps.</p>
                <div className="btnWrapper">
                    <button type="button" onClick={this.resetAllData}>Proceed</button>
                </div>
            </div>
        );
        this.setState({warningBox: warningBox});
    }

    onRecipientsChange(e) {
        let sendSmsActions = this.state.sendSmsActions;
        if(this.state.sendSmsActions.recipients.isRecipientsActive) {
            this.openWarningBox();
        }
        else {
            if(validateNumber(e.target.value)) {
                sendSmsActions.recipients.recipients = e.target.value;
                sendSmsActions.recipients.recipientCount = sendSmsActions.recipients.recipients.substr(0, e.selectionStart).split("\n").length;
            }
            else {
                this.showErrorMsg("Invalid Recipients!");
                sendSmsActions.recipients.recipientCount = 0;
            }
            this.setState({sendSmsActions: sendSmsActions});
        }
        
    }

    onRecipientSubmit() {
        let sendSmsActions = this.state.sendSmsActions;
        if(!sendSmsActions.recipients.isRecipientsActive) {
            if(this.state.sendSmsActions.recipients.recipients === "") {
                this.showErrorMsg("Recipients should be empty");
            }
            else {
                sendSmsActions.recipients.isRecipientsActive = true;
                sendSmsActions.nextStep = "messages";
                this.setState({sendSmsActions: sendSmsActions});
            }
        }
        else {
            this.openWarningBox();
        }
    }

    chooseLanguage(e) {
        let sendSmsActions = this.state.sendSmsActions;
        if(this.state.sendSmsActions.messages.isMessagesActive) {
            this.openWarningBox(); 
        }
        else {
            sendSmsActions.messages.chooseLanguage = e.target.value;
            if(sendSmsActions.messages.chooseLanguage === "English")
                sendSmsActions.messages.messagesCharLimit = 160;
            else
                sendSmsActions.messages.messagesCharLimit = 70;

            this.setState({sendSmsActions: sendSmsActions});
        }
    }

    onMessagesChange(e) {
        let sendSmsActions = this.state.sendSmsActions;
        let counter;
        if(this.state.sendSmsActions.messages.isMessagesActive) {
            this.openWarningBox(); 
        }
        else {
            sendSmsActions.messages.messages = e.target.value;
            if(sendSmsActions.messages.messages.length <= (this.state.sendSmsActions.messages.messagesCharLimit * (maxMessages - 1)))
                counter = 1;
            else
                counter = 0;
            
            if(sendSmsActions.messages.messagesCount <= maxMessages) {

                sendSmsActions.messages.messagesCount = Math.floor(sendSmsActions.messages.messages.length / this.state.sendSmsActions.messages.messagesCharLimit) + counter;
            }
            else {
                this.showErrorMsg("Message count exceeded the limit");
            }

            console.log(sendSmsActions.messages.messages.length)

            this.setState({sendSmsActions: sendSmsActions});
        }
    }

    onMessagesSubmit() {
        let sendSmsActions = this.state.sendSmsActions;
        if(!sendSmsActions.messages.isMessagesActive) {
            if(this.state.sendSmsActions.messages.messages === "") {
                this.showErrorMsg("Recipients should be empty");
            }
            else {
                sendSmsActions.messages.isMessagesActive = true;
                sendSmsActions.nextStep = "messages";
                this.setState({sendSmsActions: sendSmsActions});
            }
        }
        else {
            this.openWarningBox();
        }
    }

    messageScheduled(e) {
        let sendSmsActions = this.state.sendSmsActions;
        if(!sendSmsActions.messages.isMessageScheduled) {
            sendSmsActions.messages.isMessageScheduled = true;
        }
        else {
            sendSmsActions.messages.isMessageScheduled = false;
        }
        this.setState({sendSmsActions: sendSmsActions});
    }

    render() {
        //let senderid, recipients;
        console.log(this.state);
        switch(this.state.sendSmsActions.nextStep) {
            case "senderid":
                this.senderid = (
                    <li className="sendSmsSteps clearfix">
                        <div className="sendSmsTitle">
                            Sender Id
                        </div>
                        <div className="sendSmsOptions">
                            <FormSelectBoxControl options={senderID} onChange={this.senderidChange} />
                        </div>
                        <div className="btnWrapper">
                            <button type="button" onClick={this.onSenderidSubmit}>Next</button>
                        </div>
                    </li>
                );
                this.recipients = "";
                this.messages = "";
                break;
            case "recipients":
                this.recipients = (
                    <li className="sendSmsSteps clearfix">
                        <div className="sendSmsTitle">
                            Recipients
                        </div>
                        <div className="sendSmsOptions">
                            <TextAreaControl onChange={this.onRecipientsChange} />
                            <div className="recipientCount">Total Recipient(s): {this.state.sendSmsActions.recipients.recipientCount}</div>
                        </div>
                        <div className="btnWrapper">
                            <button type="button" onClick={this.onRecipientSubmit}>Next</button>
                        </div>
                    </li>
                );
                break;
            case "messages":
                this.messages = (
                    <li className="sendSmsSteps clearfix">
                        <div className="sendSmsTitle">
                            Messages
                        </div>
                        <div className="sendSmsOptions messagesOptions">
                            <TextAreaControl 
                                onChange={this.onMessagesChange} 
                                maxLength={this.state.sendSmsActions.messages.messagesCharLimit * maxMessages} />
                            <div>
                                {
                                    this.state.sendSmsActions.messages.messagesCharLimit + 
                                    " Characters remaining of " + 
                                    this.state.sendSmsActions.messages.messagesCount +
                                    "/" +
                                    maxMessages +
                                    "message(s)"
                                }
                                <br />
                                <FormRadioControl 
                                    radioId="english"
                                    name="Choose Language"
                                    text="English"
                                    onClick={this.chooseLanguage}
                                    defaultChecked={true} />
                                <FormRadioControl 
                                    radioId="other"
                                    name="Choose Language"
                                    text="Other"
                                    onClick={this.chooseLanguage} />
                            </div>
                            <div>
                                Schedule:
                                <FormCheckboxControl 
                                    id="messageSchedule"
                                    name="messageSchedule"
                                    onClick={this.messageScheduled} />
                                {this.state.sendSmsActions.messages.isMessageScheduled && (
                                    //<Datetime />
                                    <h2>Date Here</h2>
                                )}
                            </div>
                        </div>
                        <div className="btnWrapper">
                            <button type="button" onClick={this.onMessagesSubmit}>Next</button>
                        </div>
                    </li>
                );
                break;
        }
        return (
            <section className="sendSmsPage">
                <form>
                    <ul>
                        <li className="sendSmsSteps clearfix">
                            <div className="sendSmsTitle">
                                SMS Type
                            </div>
                            <div className="sendSmsOptions">
                                <FormRadioControl 
                                    radioId="promotional"
                                    name="SMS Type"
                                    text="Promotional"
                                    onClick={this.onSmsTypeChange} />
                                <FormRadioControl 
                                    radioId="transactional"
                                    name="SMS Type"
                                    text="Transactional"
                                    onClick={this.onSmsTypeChange} />
                            </div>
                        </li>
                        {this.senderid}
                        {this.recipients}
                        {this.messages}
                    </ul>
                </form>
                <div className={"errorMsg " + this.state.errorMsgHide.hide}>{this.state.errorMsgHide.text}</div>
                <div className={"warningBox " + this.state.warningBox.show}>
                    {this.state.warningBox.content}
                    <div className="warningBoxOverlay"/>
                </div>
            </section>
        );
    }
}

export default SendSMS;

SendSMS.propTypes = {
    loginDetails: PropTypes.object
}