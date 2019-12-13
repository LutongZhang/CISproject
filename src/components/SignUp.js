import React, { Component } from 'react';
import axios from "axios"
import { Form, Button } from 'react-bootstrap'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        }
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

        console.log(this.state.userName, this.state.password)
    }
    async handleSubmit(event) {
        // console.log(this.state)
        await axios.post('/signUp', { accountInfo: this.state })

    }

    render() {
        let style = {
            margin: '0 auto',
            width: '300px',
        }
  
        return (
            <Form onSubmit={this.handleSubmit} style={style}>
                <br></br>
                <h2 style={{color:'#2d839f', textAlign:'center'}}>Sign up today!</h2>
                <br></br>
                <br></br>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter Username" name='userName' value={this.state.userName} onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your Username with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="Enter Password" name='password' value={this.state.password} onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" style={{width:'300px'}}>
                    Sign Up
                </Button>
            </Form>
        )
    }

}

export default SignUp;