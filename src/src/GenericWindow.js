import React, { Component } from 'react';
import { Button } from 'reactstrap';
import GenericWindowProps from "./GenericWindowProps.json"
import { Icon } from 'react-fa';
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
        window.addEventListener("mousemove", (e) =>
        {
            if (this.state.isDownMove)
            {
                this.properties.window.location.x = e.clientX + this.state.offsetX;
                this.properties.window.location.y = e.clientY + this.state.offsetY;
            }
            else if (this.state.isDownResizeRight)
            {
                let newX = e.clientX + this.state.offsetX;
                this.properties.window.size.width = newX - this.properties.window.location.x;
                if (this.properties.window.size.width < this.properties.window.minSize.width)
                {
                    this.properties.window.size.width = this.properties.window.minSize.width;
                }
            }
            else if (this.state.isDownResizeLeft)
            {
                let newX = e.clientX + this.state.offsetX;
                this.properties.window.size.width = this.state.oldX - newX;
                this.properties.window.location.x = e.clientX + this.state.offsetX;
                if (this.properties.window.size.width < this.properties.window.minSize.width)
                {
                    this.properties.window.size.width = this.properties.window.minSize.width;
                    this.properties.window.location.x = this.state.oldX - this.properties.window.size.width;
                }
            }
            else if (this.state.isDownResizeBottom)
            {
                let newY = e.clientY + this.state.offsetY;
                this.properties.window.size.height = newY - this.properties.window.location.y;
                if (this.properties.window.size.height < this.properties.window.minSize.height)
                {
                    this.properties.window.size.height = this.properties.window.minSize.height;
                }
            }
            else if (this.state.isDownResizeTop)
            {
                let newY = e.clientY + this.state.offsetY;
                this.properties.window.size.height = this.state.oldY - newY;
                this.properties.window.location.y = e.clientY + this.state.offsetY;
                if (this.properties.window.size.height < this.properties.window.minSize.height)
                {
                    this.properties.window.size.height = this.properties.window.minSize.height;
                    this.properties.window.location.y = this.state.oldY - this.properties.window.size.height;
                }
            }
            this.setState({
                RANDO: true
            });
        });
        window.addEventListener("mouseup", (e) =>
        {
            this.setState({
                isDownMove: false,
                isDownResizeRight: false,
                isDownResizeLeft: false,
                isDownResizeBottom: false,
                isDownResizeTop: false
            });
        });
        window.addEventListener("_event_onZIndexMDLWindow", (e) =>
        {
            let idx = e.detail.index;
            let val = e.detail.val;
            if (idx === this.props.index)
            {
                if (val === -1)
                {
                    this.properties.window.zIndex--;
                }
                else
                {
                    this.properties.window.zIndex = val;
                }
                this.setState({
                    RANDO: true
                });
            }
        });
        window.addEventListener("_event_onZIndexMDLWindow", (e) =>
        {
            let idx = e.detail.index;
            let val = e.detail.val;
            if (idx === this.props.index)
            {
                if (val === -1)
                {
                    this.properties.window.zIndex--;
                }
                else
                {
                    this.properties.window.zIndex = val;
                }
                this.setState({
                    RANDO: true
                });
            }
        });
    }
    componentWillMount()
    {
        this.properties.window.zIndex = this.props.index;
        if (this.props.title)
        {
            this.properties.window.text = this.props.title;
        }
        if (this.props.width)
        {
            this.properties.window.size.width = this.props.width;
        }
        if (this.props.height)
        {
            this.properties.window.size.height = this.props.height;
        }
        if (this.props.x)
        {
            this.properties.window.location.x = this.props.x;
        }
        if (this.props.y)
        {
            this.properties.window.location.y = this.props.y;
        }
        this.setState({
            isDownMove: false
        });
    }
    render()
    {
        return (
            <div id="GenericWindow" style={{ position: "fixed", top: this.properties.window.location.y, left: this.properties.window.location.x, width: this.properties.window.size.width, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.background), boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.2)", userSelect: "none", zIndex: this.properties.window.zIndex }} onMouseDown={(e) =>
            {
                window.dispatchEvent(new CustomEvent("_event_onWindowSelect", { detail: { index: this.props.index } }));
            }}>
                <div id="boundBottom" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: this.properties.boundaries.bottom, background: CSS_ToRGB(this.properties.colors.border), cursor: "ns-resize" }} onMouseDown={(e) =>
                {
                    this.setState({
                        isDownResizeBottom: true,
                        offsetX: this.properties.window.location.x - e.clientX,
                        offsetY: this.properties.window.location.y - e.clientY + this.properties.window.size.height
                    });
                }}>
                </div>
                <div id="boundLeft" style={{ position: "absolute", top: 0, left: 0, right: 0, width: this.properties.boundaries.left, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.border), cursor: "ew-resize" }} onMouseDown={(e) =>
                {
                    this.setState({
                        isDownResizeLeft: true,
                        offsetX: this.properties.window.location.x - e.clientX,
                        offsetY: this.properties.window.location.y - e.clientY,
                        oldX: this.properties.window.location.x + this.properties.window.size.width
                    });
                }}></div>
                <div id="boundRight" style={{ position: "absolute", top: 0, right: 0, width: this.properties.boundaries.right, height: this.properties.window.size.height, background: CSS_ToRGB(this.properties.colors.border), cursor: "ew-resize" }} onMouseDown={(e) =>
                {
                    this.setState({
                        isDownResizeRight: true,
                        offsetX: this.properties.window.location.x - e.clientX + this.properties.window.size.width,
                        offsetY: this.properties.window.location.y - e.clientY
                    });
                }}></div>
                <div id="boundTop" style={{ position: "absolute", left: 0, right: 0, height: this.properties.boundaries.top, background: CSS_ToRGB(this.properties.colors.border), userSelect: "none", paddingLeft: 2, paddingRight: 0 }} onMouseDown={(e) =>
                {
                    this.setState({
                        isDownMove: true,
                        offsetX: this.properties.window.location.x - e.clientX,
                        offsetY: this.properties.window.location.y - e.clientY
                    });
                }}>
                    <p style={{ width: "100%", height: "100%", verticalAlign: "middle", overflow: "hidden" }}>{this.properties.window.text}<Button outline color="danger" style={{ position: "absolute", right: 0, width: this.properties.boundaries.top, height: this.properties.boundaries.top, borderRadius: 0, border: "none", margin: 0, padding: 0 }} onClick={(e) =>
                    {
                        window.dispatchEvent(new CustomEvent("_event_onCloseMDLWindow", { detail: { index: this.props.index } }));
                    }}> <Icon name="close" /></Button></p>
                </div>
                <div id="boundTop" style={{ position: "absolute", top: 0, left: 0, right: 0, height: this.properties.boundaries.bottom, cursor: "ns-resize" }} onMouseDown={(e) =>
                {
                    this.setState({
                        isDownResizeTop: true,
                        offsetX: this.properties.window.location.x - e.clientX,
                        offsetY: this.properties.window.location.y - e.clientY,
                        oldY: this.properties.window.location.y + this.properties.window.size.height
                    });
                }}>
                </div>
                <div id="content" style={{ position: "absolute", top: this.properties.boundaries.top, left: this.properties.boundaries.left, width: this.properties.window.size.width - this.properties.boundaries.left - this.properties.boundaries.right, height: this.properties.window.size.height - this.properties.boundaries.top - this.properties.boundaries.bottom }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default GenericWindow;