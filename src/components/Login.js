import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'


class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            fail: '',
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

        //console.log(this.state.userName, this.state.password)
    }
    async handleSubmit() {

        const response = await axios.get("/Login",
            { params: { userName: this.state.userName, password: this.state.password } }
        )
        console.log(response)
        if (response.data) {
            this.props.x(true)
            this.setState({ fail: 'Login Success.' })
        }
        else {
            this.props.x(false)
            this.setState({ fail: 'Invalid username or password.' })
        }
    }

    render() {
        let style = {
            margin: '0 auto',
            width: '300px',
        }
    
        return (
            <Form onSubmit={this.handleSubmit} style={style}>
                <br></br>
                <h2 style={{color:'#2d839f', textAlign:'center'}}>Log in to your account</h2>
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
                
                <Button variant="primary" onClick={this.handleSubmit} style={{width:'300px'}}>
                    Sign In
                </Button>

                {this.state.fail}
            </Form>
        )
    }
}

export default Login;