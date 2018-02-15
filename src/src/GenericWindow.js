import React, { Component } from 'react';
import { Button } from 'reactstrap';
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
        window.addEventListener("mousemove", (e) =>
        {
            if (this.state.isDown)
            {
                this.properties.window.location.x = e.clientX + this.state.offsetX;
                this.properties.window.location.y = e.clientY + this.state.offsetY;
                this.setState({
                    RANDO: true
                });
            }
        });
        window.addEventListener("mouseup", (e) =>
        {
            this.setState({
                isDown: false
            });
        });
    }
    componentWillMount()
    {
        this.setState({
            isDown: false
        });
    }
    render()
    {
        return (
            <div id="GenericWindow" style={{ position: "fixed", top: this.properties.window.location.y, left: this.properties.window.location.x, width: this.properties.window.size.width, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.background), boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.2)" }}>
                <div id="boundBottom" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: this.properties.boundaries.bottom, background: CSS_ToRGB(this.properties.colors.border) }}>

                </div>
                <div id="boundLeft" style={{ position: "absolute", top: 0, left: 0, right: 0, width: this.properties.boundaries.left, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.border) }}>

                </div>
                <div id="boundRight" style={{ position: "absolute", top: 0, right: 0, width: this.properties.boundaries.right, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.border) }}>

                </div>
                <div id="boundTop" style={{ position: "absolute", left: 0, right: 0, height: this.properties.boundaries.top, background: CSS_ToRGB(this.properties.colors.border), userSelect: "none", paddingLeft: 2, paddingRight: 2 }} onMouseDown={(e) =>
                {
                    this.setState({
                        isDown: true,
                        offsetX: this.properties.window.location.x - e.clientX,
                        offsetY: this.properties.window.location.y - e.clientY
                    });
                }}>
                    <p style={{ width: "100%" }}>{this.properties.window.text}<Button outline color="danger" style={{ position: "absolute", right: 0, width: this.properties.boundaries.top, height: this.properties.boundaries.top, borderRadius: 0, border: "none" }}>Exit</Button></p>
                </div>
                <div id="content" style={{ position: "absolute", top: this.properties.boundaries.top, left: this.properties.boundaries.left, width: this.properties.window.size.width - this.properties.boundaries.left - this.properties.boundaries.right, height: this.properties.window.size.height - this.properties.boundaries.top - this.properties.boundaries.bottom }}>
                    shivan
                </div>
            </div>
        )
    }
}
export default GenericWindow;