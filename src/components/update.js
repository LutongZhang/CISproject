import React, { Component } from 'react';
import axios from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genus: ' ',
            species: ' ',
            comname: ' ',
            isVisible: null
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


    }

    async handleSubmit(event) {
        // console.log(this.state)
        await axios.post('/send', { update: this.state, choseFlower: this.props.choseFlower })
        return <Redirect to='/' />
        event.preventDefault();

    }

    render() {
        return (
            <div>
                <form id="updateForm" onSubmit={this.handleSubmit}>
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

                    <button type="submit" value="Submit" >Submit</button>

                    {!this.state.done && (
                        <form onSubmit={this.handleSubmit}></form>
                    )}

                </form>
            </div>
        );
    }
}

export default Update;