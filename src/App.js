import React from 'react';
import HomePage from './components/homepage'
import { Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Login: false,
    }
    this.changeLogIn = this.changeLogIn.bind(this);
  }

  changeLogIn(bool) {
    this.setState({ Login: bool })
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/Home">FlowerDB</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link ><Link to='/Home'>Home</Link></Nav.Link>
                <Nav.Link ><Link to='/LogIn'>SignIn</Link></Nav.Link>
                <Nav.Link ><Link to='/SignUp'>SignUp</Link></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/Home">
              <HomePage Login={this.state.Login} />
            </Route>
            <Route path="/LogIn" >
              <Login x={this.changeLogIn} />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/">
              <HomePage Login={this.state.Login} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;