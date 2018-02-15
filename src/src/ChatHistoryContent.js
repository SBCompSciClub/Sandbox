import React, { Component } from 'react';
import { Input, Button, Form } from 'reactstrap';
class ChatContent extends Component
{
    constructor()
    {
        super();
        this.RenderMessages = this.RenderMessages.bind(this);
        this.firebaseGetData = this.firebaseGetData.bind(this);
        this.firebaseAppendData = this.firebaseAppendData.bind(this);
        window.addEventListener("_event_onDataAdded", (e) =>
        {
            let val = e.detail.data.message;
            if (val)
            {
                this.state.messages.unshift(val);
                this.setState({
                    messages: this.state.messages
                });
            }
        });
    }
    componentWillMount()
    {
        let messages = [];
        this.firebaseGetData("/messages/", (e) =>
        {
            Object.keys(e).forEach((key) =>
            {
                messages.unshift(e[key]["message"]);
            });
        });
        this.setState({
            messages: messages,
        });
    }
    firebaseAppendData(reference, data, error, complete)
    {
        window.dispatchEvent(new CustomEvent("_event_onAppendData", { detail: { reference: reference, data: data, onError: error, onComplete: complete } }));
    }
    firebaseGetData(reference, callback)
    {
        window.dispatchEvent(new CustomEvent("_event_onGetData", { detail: { reference: reference, callback: callback } }));
    }
    RenderMessages()
    {
        let _return = [];
        for (let i = 0; i < this.state.messages.length; i++)
        {
            _return.push(
                <div id="messageContent" style={{ fontSize: 12, width: "100%" }}>
                    {this.state.messages[i]}
                </div>);
        }
        return _return;
    }
    render()
    {
        return (
            <div style={{ width: "100%", height: "100%", userSelect: "text" }}>
                <div id="messages" style={{ paddingLeft: 5, paddingRight: 5, width: "100%", height: "100%", overflowY: "auto" }}>
                    {this.RenderMessages()}
                </div>
            </div >
        );
    }
}
export default ChatContent;