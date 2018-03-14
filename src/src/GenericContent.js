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
                path: this.BaseURL + "/resources/file.html",
                onLoaded: (_result) => {
                    let jsArr = /<script>[\s\S]*<\/script>/gi.exec(_result);
                    let js = jsArr[0].replace("<script>", "").replace("</script>", "");
                    let html = _result.replace(jsArr[0], "");
                    this.setState({
                        html: html,
                        js: js
                    });
                    window.eval(js);
                }
            }
        }));
    }
    render()
    {
        return (
            <div id="contentContainer" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
        );
    }
}
export default GenericContent;
