import React, { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./components/global.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SeatLayout from "./components/SeatLayout";
import Search from "./components/Search";
import BusListing from "./components/BusListing";
import Nav from "./components/nav/Nav";
import GlobalState from "./context/GlobalState";
if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true
  });
}
// const init = () => {
//   return {
//     seats: [],
//     searchParams: {},
//     trip: {},
//     list: {}
//   };
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SEATS":
//       return { ...state, seats: action.value };
//     case "SEARCH_PARAMS":
//       return { ...state, searchParams: action.value };
//     case "TRIP":
//       return { ...state, trip: action.value };
//     case "LIST":
//       return { ...state, list: action.value };
//     default:
//       return state;
//   }
// };
function App(props) {
  // const [state, dispatch] = useReducer(reducer, init);
  // const handalTrip = trip => {
  //   dispatch({ type: "TRIP", value: trip });
  // };
  // const handalParams = params => {
  //   dispatch({ type: "SEARCH_PARAMS", value: params });
  // };
  // const handalSeats = seats => {
  //   dispatch({ type: "SEATS", value: seats });
  // };
  // const handalBusList = list => {
  //   dispatch({ type: "LIST", value: list });
  // };

  return (
    <GlobalState>
      <React.Fragment>
        <div className="main-section">
          <Nav></Nav>
          <Router>
            <div className="App">
              <Switch>
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
              </Switch>
            </div>
          </Router>
        </div>
      </React.Fragment>
    </GlobalState>
  );
}

export default App;
