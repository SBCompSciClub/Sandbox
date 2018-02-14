import React, { Component } from 'react';
import { Button } from 'reactstrap';
import GenericWindow from './GenericWindow';
class App extends Component
{
    render()
    {
        return (
            <div className="App">
                <GenericWindow></GenericWindow>
            </div>
        );
    }
}
export default App;
