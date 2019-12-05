import React, { Component } from 'react';
import axios from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


class Insert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: ' ',
            location: ' ',
            sighted: ' '
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
        await axios.post('/Insert', { insert: this.state, choseFlower: this.props.choseFlower })
        return <Redirect to='/' />
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person:
                        <input type="text" name='person' value={this.state.person} onChange={this.handleChange} />
                    </label>
                    <label>
                        Location:
                        <input type="text" name='location' value={this.state.location} onChange={this.handleChange} />
                    </label>
                    <label>
                        Sighted:
                        <input type="date" name='sighted' value={this.state.sighted} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

            </div>
        );
    }
}

export default Insert;