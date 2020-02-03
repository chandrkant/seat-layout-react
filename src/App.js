import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SeatLayout from './SeatLayout';

function App() {
  return (
    <Router>
      <div className="App">
      <Route exact path="/:trip_id" component={SeatLayout}></Route>
      
      </div>
    </Router>
  );
}

export default App;
