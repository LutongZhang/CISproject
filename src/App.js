import React from 'react';
import HomePage from './components/homepage'
import { BrowserRouter as Router } from "react-router-dom"

let App = () => {
  return (
    <div>
      <Router>
        <HomePage />
      </Router>
    </div>
  )

}

export default App;