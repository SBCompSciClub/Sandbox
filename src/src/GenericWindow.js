import React, { Component } from 'react';
import GenericWindowProps from "./GenericWindowProps.json"
const CSS_ToRGB = (props) =>
{
    return "rgba(" + props.R + ", " + props.G + ", " + props.B + ", " + props.A + ")";
}
class GenericWindow extends Component
{
    constructor()
    {
        super();
        this.Size = {
            Width: 300,
            Height: 300
        };
        this.properties = JSON.parse(JSON.stringify(GenericWindowProps));
        console.log(this.properties);
    }
    render()
    {
        return (
            <div id="GenericWindow" style={{ position: "fixed", top: this.properties.window.location.x, left: this.properties.window.location.y, width: this.properties.window.size.width, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.background) }}>
                <div id="boundTop" style={{ position: "absolute", left: 0, right: 0, height: this.properties.boundaries.top, background: CSS_ToRGB(this.properties.colors.border) }}>

                </div>
                <div id="boundBottom" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: this.properties.boundaries.bottom, background: CSS_ToRGB(this.properties.colors.border) }}>

                </div>
                <div id="boundLeft" style={{ position: "absolute", top: 0, left: 0, right: 0, width: this.properties.boundaries.left, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.border) }}>

                </div>
                <div id="boundRight" style={{ position: "absolute", top: 0, right: 0, width: this.properties.boundaries.right, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.border) }}>

                </div>
                <div id="content" style={{ position: "absolute", top: this.properties.boundaries.top, left: this.properties.boundaries.left, width: this.properties.window.size.width - this.properties.boundaries.left - this.properties.boundaries.right, height: this.properties.window.size.height - this.properties.boundaries.top - this.properties.boundaries.bottom, background: "red" }}>
                    shivan
                </div>
            </div>
        )
    }
}
export default GenericWindow;