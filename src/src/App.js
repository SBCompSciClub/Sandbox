import React, { Component } from 'react';
import GenericWindow from './GenericWindow';
import ChatContent from './ChatContent';
import configuration from './configuration.json';
class App extends Component
{
    constructor()
    {
        super();
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
        let windows = [];
        windows.push(<GenericWindow index={0} title="Chat"><ChatContent /></GenericWindow>);
        this.setState({
            windows: windows
        });
    }
    render()
    {
        return (
            <div className="App">
                {this.state.windows}
            </div>
        );
    }
}
export default App;
