import React from 'react';
import HomePage from './components/homepage'
import {
  BrowserRouter as Router,
} from "react-router-dom";


let App = () => {
  return (
    <Router>
      <div>
        <HomePage />
      </div>
    </Router>
  )

}

export default App;
