import React, { useReducer } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SeatLayout from "./components/SeatLayout";
import Search from "./components/Search";
import BusListing from "./components/BusListing";
import Nav from "./components/nav/Nav";
const init = () => {
  return {
    seats: [],
    searchParams: {},
    trip: {},
    list: {}
  };
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SEATS":
      return { ...state, seats: action.value };
    case "SEARCH_PARAMS":
      return { ...state, searchParams: action.value };
    case "TRIP":
      return { ...state, trip: action.value };
    case "LIST":
      return { ...state, list: action.value };
    default:
      return state;
  }
};
function App(props) {
  const [state, dispatch] = useReducer(reducer, init);
  const handalTrip = trip => {
    dispatch({ type: "TRIP", value: trip });
  };
  const handalParams = params => {
    dispatch({ type: "SEARCH_PARAMS", value: params });
  };
  const handalSeats = seats => {
    dispatch({ type: "SEATS", value: seats });
  };
  return (
    <div>
      <Nav></Nav>
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            component={(props) => <Search {...props} handalParams={handalParams} />}
          ></Route>
          <Route
            exact
            path="/bus-listing/:from-to-:to-buses"
            component={(props) => <BusListing {...props} handalTrip={handalTrip} />}
          ></Route>
          <Route
            exact
            path="/seat-layout/:trip_id"
            component={(props) => <SeatLayout {...props} handalSeats={handalSeats} />}
          ></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
