import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genus: ' ',
            species: ' ',
            comname: ' '
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
        console.log(this.state)

    }

    handleSubmit(event) {
        alert('The flower information has been inserted.' +
            ' Genus: ' + this.state.genus +
            ' Species: ' + this.state.species +
            ' Common Name: ' + this.state.comname);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Genus:
                        <input type="text" name='genus' value={this.state.genus} onChange={this.handleChange} />
                    </label>
                    <label>
                        Species:
                        <input type="text" name='species' value={this.state.species} onChange={this.handleChange} />
                    </label>
                    <label>
                        Common Name:
                        <input type="text" name='comname' value={this.state.comname} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Insert;