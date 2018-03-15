import React, { Component } from 'react';
import GenericWindow from './GenericWindow';
import GenericContent from './GenericContent';
import configuration from './configuration.json';
import { Button } from 'reactstrap';
class App extends Component
{
    constructor()
    {
        super();
        window.dispatchEvent(new CustomEvent("_event_onGetBase", {
            detail: {
                callback: (e) =>
                {
                    this.BaseURL = e;
                }
            }
        }));
        this.index = 0;
        window.addEventListener("_event_onCloseMDLWindow", (e) =>
        {
            let idx = e.detail.index;
            if (this.state.winArrId[idx])
            {
                this.WindowArr[this.state.winArrId[idx]]["cWin"] -= 1;
                this.state.winArrId[idx] = null;
            }    
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
        window.addEventListener("_new_window", (e) => {
            let win = <GenericWindow x={this.index * 10} y={this.index * 10} index={this.index} title={e.detail.title} width={e.detail.width} height={e.detail.height} icon={e.detail.icon}><GenericContent html={e.detail.html} /></GenericWindow>;
            this.state.winArrId.push(e.detail.id);
            this.state.windows.push(win);
            this.index++;
            this.setState({
                windows: this.state.windows,
                winArrId: this.state.winArrId
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
            windows: [],
            winArrId: []
        });
        window.dispatchEvent(new CustomEvent("_event_onRequestFile", {
            detail: {
                path: this.BaseURL + "/resources/windows.json",
                onLoaded: (_result) =>
                {
                    this.WindowArr = JSON.parse(_result)["windows"];
                    this.setState({ RANDO: "RAN" });
                    let itm = this.WindowArr[0];
                    window.dispatchEvent(new CustomEvent("_new_window", {
                        detail: {
                            icon: itm["icon"],
                            title: itm["title"],
                            width: itm["width"],
                            height: itm["height"],
                            html: itm["html"]
                        }
                    }));
                }
            }
        }));
    }
    componentDidMount()
    {
    }
    render()
    {
        let itms = [];
        if (this.WindowArr) {
            for (let i = 0; i < this.WindowArr.length; i++) {
                let itm = this.WindowArr[i];
                itms.push(<Button outline color="info" style={{ width: 50, height: 40, borderRadius: 0, borderTop: 0, borderBottom: 0, border: 0, backgroundImage: "url('" + itm["icon"] + "')", backgroundSize: "25px 25px", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} onClick={(e) => {
                    if (!this.WindowArr[i]["cWin"])
                    {
                        this.WindowArr[i]["cWin"] = 1;
                    }
                    else
                    {                    
                    }
                    if (!this.WindowArr[i]["maxWin"] || this.WindowArr[i]["cWin"] <= itm["maxWin"])
                    {
                        this.WindowArr[i]["cWin"] += 1;    
                        window.dispatchEvent(new CustomEvent("_new_window", {
                            detail: {
                                icon: itm["icon"],
                                title: itm["title"],
                                width: itm["width"],
                                height: itm["height"],
                                html: itm["html"],
                                id: i
                            }
                        }));
                    }
                    else
                    {

                    }
                }}></Button>);
            }
        }
        return (
            <div className="App">
                <div id="container">
                    <div id="window-container" style={{background:"transparent"}}>
                        {this.state.windows}
                    </div>
                    <div id="menu" style={{ position: "absolute", width: "100%", bottom: 0, background: "rgba(0, 0, 0, 0.75)", color: "white", zIndex: 10000, paddingLeft: 10 }}>
                        {itms}
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
