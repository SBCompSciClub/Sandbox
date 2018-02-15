import React, { Component } from 'react';
import { Button } from 'reactstrap';
import GenericWindow from './GenericWindow';
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
    }
    componentWillMount()
    {
        let windows = [];
        windows.push(<GenericWindow index={0} title="0">Shivan</GenericWindow>);
        windows.push(<GenericWindow index={1} title="1" />);
        windows.push(<GenericWindow index={2} title="2" />);
        console.log(windows);
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
