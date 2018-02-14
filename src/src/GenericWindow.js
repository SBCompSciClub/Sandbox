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
                <div id="boundBottom" style={{ position: "absolute", bottom: this.properties.window.size.height - this.properties.boundaries.bottom, left: 0, right: 0, height: this.properties.boundaries.bottom, background: CSS_ToRGB(this.properties.colors.border) }}>

                </div>
            </div>    
        )
    }
}
export default GenericWindow;