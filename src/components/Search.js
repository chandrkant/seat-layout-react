import React, { useEffect, useReducer } from "react";
import { format } from "date-fns";
import { BrowserRouter as Router,Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import BusListing from "./BusListing";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
export const BusListData = React.createContext();
const init = props => {
  return {
    searchParams: {
      from: "",
      to: "",
      fCode: "",
      tCode: "",
      doj: format(new Date(), "dd-MM-yyyy"),
      altDoj: format(new Date(), "MMM dd, yyyy")
    },
    cities: [],
    selectedDate: new Date(),
    listing:{}
  };
};
const reducer = (state, action) => {
  switch (action.type) {
    case "PARAMS":
      return { ...state, searchParams: action.value };
    case "CITIES":
      return { ...state, cities: action.value };
    case "SET_DATE":
      return { ...state, selectedDate: action.value };
    case "LIST":
        return { ...state, listing: action.value };  
    default:
      return state;
  }
};
function Search(props) {
  const [state, dispatch] = useReducer(reducer, props, init);
  const handleDateChange = date => {
    dispatch({
      type: "PARAMS",
      value: {
        ...state.searchParams,
        doj: format(date, "dd-MM-yyyy"),
        altDoj: format(date, "MMM dd, yyyy")
      }
    });
    dispatch({ type: "SET_DATE", value: date });
    getBusList(props);
  };

  const defaultProps = {
    options: state.cities,
    getOptionLabel: option => option.city_name
  };

  const sourceCitys = async () => {
    const data = await fetch(
      "https://api.railyatri.in/redbus/source-city-list.json"
    );
    const city = await data.json();
    dispatch({ type: "CITIES", value: city.city_list });
  };

  const onSelect = (option, type) => {
    if (option) {
      if (type === "f") {
        dispatch({
          type: "PARAMS",
          value: {
            ...state.searchParams,
            fCode: option.city_id,
            from: option.city_name
          }
        });
      } else {
        dispatch({
          type: "PARAMS",
          value: {
            ...state.searchParams,
            tCode: option.city_id,
            to: option.city_name
          }
        });
      }
    }
    getBusList(props);
  };
  const getBusList = props => {
    if (isEmpty(state.searchParams)) {
      fetch(
        `https://test.railyatri.in/redbus/get-available-trips.json?source=${state.searchParams.fCode}&destination=${state.searchParams.tCode}&doj=${state.searchParams.doj}&device_type_id=4&is_new_reduce_basefare=1`
      ).then(resp => {
        // props.handalBusList(resp.json());
        // setList(resp.json());
      });
    }
  };
  const isEmpty = obj => {
    let valid = true;
    for (var key in obj) {
      if (obj[key] === "") {
        valid = false;
      }
    }
    return valid;
  };

  const getBuses = props => {
    if (isEmpty(state.searchParams)) {
      props.handalParams(state.searchParams);
      props.history.push(
        `/bus-listing/${state.searchParams.from}-to-${state.searchParams.to}-buses`
      );
    } else {
    }
  };

  useEffect(() => {
    sourceCitys();
  }, []);

  return (
    <div className="container-fluid">
      <Autocomplete
        {...defaultProps}
        id="from-city"
        clearOnEscape
        onChange={(event, newValue) => {
          onSelect(newValue, "f");
          event.preventDefault();
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="From City"
            margin="normal"
            name="from_city"
            fullWidth
          />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id="to-city"
        clearOnEscape
        onChange={(event, newValue) => {
          onSelect(newValue, "t");
          event.preventDefault();
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="To City"
            margin="normal"
            name="to_city"
            fullWidth
          />
        )}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MMM dd, yyyy"
            value={state.selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            clearable
            fullWidth
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <div className="">
        <button className="btn btn-primary btn-block" onClick={() => getBuses(props)}>
          SEARCH
        </button>
      </div>
      <Router>
      <Route
              exact
              path="/bus-listing/:from-to-:to-buses"
              component={props => (
                <BusListData.Provider>
                  <BusListing {...props} />
                </BusListData.Provider>
                
              )}
            ></Route>
            </Router>
    </div>
  );
}

export default Search;
