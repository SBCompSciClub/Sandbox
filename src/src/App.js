import React, { Component } from 'react';
import GenericWindow from './GenericWindow';
import GenericContent from './GenericContent';
import ChatContent from './ChatContent';
import ChatHistoryContent from './ChatHistoryContent';
import configuration from './configuration.json';
import stegoImage from './media/Stego.png';
import copySlashB from './media/copySlashB.mp3';
import { Button } from 'reactstrap';
class App extends Component
{
    constructor()
    {
        super();
        this.index = 0;
        window.addEventListener("_event_onCloseMDLWindow", (e) =>
        {
            let idx = e.detail.index;
            this.state.windows[idx] = null;
            this.setState({
                windows: this.state.windows
            });
        });
        window.addEventListener("_event_onWindowSelect", (e) =>
        {
            for (let i = 0; i < this.state.windows.length; i++)
            {
                let val = -1;
                if (i === e.detail.index)
                {
                    val = this.state.windows.length;
                }
                window.dispatchEvent(new CustomEvent("_event_onZIndexMDLWindow", { detail: { index: i, val: val } }));
            }
        });
        window.addEventListener("_new_window_chat", (e) =>
        {
            this.state.windows.push(<GenericWindow x={this.index * 10} y={this.index * 10} index={this.index} title="Chat"><ChatContent id={this.index} /></GenericWindow>);
            this.index++;
            this.setState({
                windows: this.state.windows
            });
        });
        window.addEventListener("_new_window_history", (e) =>
        {
            this.state.windows.push(<GenericWindow x={this.index * 10} y={this.index * 10} width={400} height={600} index={this.index} title="History"><ChatHistoryContent id={this.index} /></GenericWindow>);
            this.index++;
            this.setState({
                windows: this.state.windows
            });
        });
        window.addEventListener("_new_window_audio", (e) =>
        {
            this.state.windows.push(
                <GenericWindow x={this.index * 10} y={this.index * 10} width={400} height={310} index={this.index} title="Audio">
                    <img src={stegoImage} width="100%"/>
                    <audio controls><source src={copySlashB} type="audio/mp3"/></audio>
                </GenericWindow>);
            this.index++;
            this.setState({
                windows: this.state.windows
            });
        });
        window.addEventListener("_new_window_about", (e) =>
        {
            this.state.windows.push(
                <GenericWindow index={this.index} title="About" width={350} height={110} x={this.index * 10} y={this.index * 10}>
                    <div style={{ width: "100%", height: "100%", background: "rgb(220, 220, 220)" }}>
                        Created by: Shivan Modha and Kevin Sun
                    <br/>
                        CSC@SBHS
                    <br/>
                        Sandbox v0.0.2
                </div>
                </GenericWindow>);
            this.index++;
            this.setState({
                windows: this.state.windows
            });
        });
        window.addEventListener("_new_window_open", (e) =>
        {
            this.state.windows.push(
                <GenericWindow x={this.index * 10} y={this.index * 10} index={this.index} title="Windows" width={150} height={185}>
                    <Button style={{ borderRadius: 0, width: 145 }} onClick={(e) => { window.dispatchEvent(new Event("_new_window_chat")); }}>Chat</Button><br />
                    <Button style={{ borderRadius: 0, width: 145 }} onClick={(e) => { window.dispatchEvent(new Event("_new_window_about")); }}>About</Button><br />
                    <Button style={{ borderRadius: 0, width: 145 }} onClick={(e) => { window.dispatchEvent(new Event("_new_window_history")); }}>Chat History</Button><br />
                    <Button style={{ borderRadius: 0, width: 145 }} onClick={(e) => { window.dispatchEvent(new Event("_new_window_audio")); }}>Audio Challenge</Button>
                </GenericWindow>);
            this.index++;
            this.setState({
                windows: this.state.windows
            });
        });
        this.firebaseInitialize = this.firebaseInitialize.bind(this);
        this.firebaseSetData = this.firebaseSetData.bind(this);
        this.firebaseUpdateData = this.firebaseUpdateData.bind(this);
        this.firebaseAppendData = this.firebaseAppendData.bind(this);
        this.firebaseGetData = this.firebaseGetData.bind(this);
        this.firebaseInitialize(configuration);
    }
    firebaseInitialize(configuration)
    {
        window.dispatchEvent(new CustomEvent("_event_onInitializeFirebase", { detail: { configuration: configuration } }));
    }
    firebaseSetData(reference, data)
    {
        window.dispatchEvent(new CustomEvent("_event_onSetData", { detail: { reference: reference, data: data } }));
    }
    firebaseAppendData(reference, data, error, complete)
    {
        window.dispatchEvent(new CustomEvent("_event_onAppendData", { detail: { reference: reference, data: data, onError: error, onComplete: complete } }));
    }
    firebaseUpdateData(reference, data)
    {
        window.dispatchEvent(new CustomEvent("_event_onUpdateData", { detail: { reference: reference, data: data } }));
    }
    firebaseGetData(reference, callback)
    {
        window.dispatchEvent(new CustomEvent("_event_onGetData", { detail: { reference: reference, callback: callback } }));
    }
    componentWillMount()
    {
        this.setState({
            windows: []
        });
    }
    componentDidMount()
    {
        window.dispatchEvent(new Event("_new_window_about"));
        window.dispatchEvent(new Event("_new_window_open"));
        this.state.windows.push(
            <GenericWindow x={100} y={100} index={this.index} title="Generic" width={200} height={200}>
                <GenericContent />
            </GenericWindow>
        );
        this.index++;
    }
    render()
    {
         return (
            <div className="App">
                <div id="container">
                    <div id="window-container" style={{ background: "red" }}>
                        {this.state.windows}
                    </div>
                    <div id="menu" style={{ position: "absolute", width: "100%", bottom: 0, background: "red", zIndex: 10000 }}>
                        HELLO
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
