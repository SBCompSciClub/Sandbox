import React, { Component } from 'react';
class GenericContent extends Component
{
    constructor(props)
    {
        super(props)
        window.dispatchEvent(new CustomEvent("_event_onGetBase", {
            detail: {
                callback: (e) => {
                    this.BaseURL = e;
                }
            }
        }));
    }
    componentWillMount()
    {
        this.setState({
            html: "",
            js: ""
        });
        window.dispatchEvent(new CustomEvent("_event_onRequestFile", {
            detail: {
                path: this.BaseURL + this.props.html,
                onLoaded: (_result) => {
                    if (_result && _result.length > 0) {
                        let jsArr = /<script>[\s\S]*<\/script>/gi.exec(_result);
                        let js = "";
                        let html = _result;
                        if (jsArr) {
                            js = jsArr[0].replace("<script>", "").replace("</script>", "");
                            html = _result.replace(jsArr[0], "");
                        }
                        this.setState({
                            html: html,
                            js: js
                        });
                        window.eval(js);
                    } else {
                        this.setState({
                            html: "404 Error"
                        })
                    }
                }
            }
        }));
    }
    render()
    {
        return (
            <div id="contentContainer" style={{ overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
        );
    }
}
export default GenericContent;
