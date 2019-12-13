import React, { Component } from 'react';
import axios from "axios"
import {
    BrowserRouter as Router,
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
        await axios.post('/Insert', { insert: this.state, chosenFlower: this.props.chosenFlower })
        return <Redirect to='/' />
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person:
                        <input className="textbox" type="text" name='person' value={this.state.person} onChange={this.handleChange} />
                    </label>
                    <label>
                        Location:
                        <input className="textbox" type="text" name='location' value={this.state.location} onChange={this.handleChange} />
                    </label>
                    <label>
                        Sighted:
                        <input className="textbox" type="date" name='sighted' value={this.state.sighted} onChange={this.handleChange} />
                    </label>
                    
                    <button type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Insert;