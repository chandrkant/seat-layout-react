import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SeatLayout from "./components/SeatLayout";
import Search from "./components/Search";
import BusListing from "./components/BusListing";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Search}></Route>
        <Route
          exact
          path="/bus-listing/:from-to-:to-buses"
          component={BusListing}
        ></Route>
        <Route
          exact
          path="/seat-layout/:trip_id"
          component={SeatLayout}
        ></Route>
      </div>
    </Router>
  );
}

export default App;
