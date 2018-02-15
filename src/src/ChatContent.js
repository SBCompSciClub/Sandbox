import React, { Component } from 'react';
import { Input, Button, Form } from 'reactstrap';
class ChatContent extends Component
{
    constructor()
    {
        super();
        this.RenderMessages = this.RenderMessages.bind(this);
        this.firebaseAppendData = this.firebaseAppendData.bind(this);
        window.addEventListener("_event_onDataAdded", (e) =>
        {
            let val = e.detail.data.message;
            if (val && this.state.start)
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
        this.setState({
            messages: ["Happy Hacking!"],
            start: false
        });
    }
    firebaseAppendData(reference, data, error, complete)
    {
        window.dispatchEvent(new CustomEvent("_event_onAppendData", { detail: { reference: reference, data: data, onError: error, onComplete: complete } }));
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
                <div id="messages" style={{ paddingLeft: 5, paddingRight: 5, width: "100%", height: "calc(100% - 30px)", overflowY: "auto" }}>
                    {this.RenderMessages()}
                </div>
                <div id="sender" style={{ position: "absolute", top: "calc(100% - 30px)", height: 30, width: "100%" }}>
                    <Form onSubmit={(e) =>
                    {
                        e.preventDefault();
                        let message = document.getElementById("textbox").value;
                        this.setState({
                            start: true,
                            messages: this.state.messages
                        });
                        this.firebaseAppendData("/messages/", { "message": message }, () =>
                        {

                        }, () =>
                            {

                            });
                        document.getElementById("textbox").value = "";
                    }}>
                        <Input onChange={(e) => { this.setState({ start: true }); }} autoComplete="off" id="textbox" required size="sm" style={{ display: "inline-block", width: "calc(100% - 50px)", borderRadius: 0, border: "none" }} />
                        <Button type="submit" size="sm" color="info" style={{ position: "absolute", height: 30, top: "calc(100% - 30px)", margin: 0, padding: 0, border: "none", borderRadius: 0, width: 50 }}>Send</Button>
                    </Form>
                </div>
            </div >
        );
    }
}
export default ChatContent;