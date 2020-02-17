import React, { useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import BusContext from "../context/BusContext";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
function Search(props) {
  const context = useContext(BusContext);
  const defaultProps = {
    getOptionLabel: option => option.city_name,
    filterOptions: (options, state) => {
      if (state.inputValue.length > 1) {
        return options.filter(city => {
          return city.city_name
            .toLowerCase()
            .startsWith(state.inputValue);
        });
      } else {
        return [];
      }
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
    if (isEmpty(context.searchParams)) {
      const search = `fCode=${context.searchParams.fCode}&tCode=${context.searchParams.tCode}&doj=${context.searchParams.doj}`;
      props.history.push(
        `/bus-listing/${context.searchParams.from}-to-${context.searchParams.to}-buses?${search}`
      );
    } else {
    }
  };

  useEffect(() => {
    console.log(context);
    context.sourceCitys();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Autocomplete
          options={context.cities}
          {...defaultProps}
          id="from-city"
          defaultValue={{
            city_name: context.searchParams.from,
            city_id: context.searchParams.fCode
          }}
          onChange={(event, newValue) => {
            if (newValue === null) {
              newValue = { city_name: "", city_id: "" };
            }
            context.onSelect(newValue, "f");
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
          options={context.destcities}
          {...defaultProps}
          id="to-city"
          onChange={(event, newValue) => {
            if (newValue === null) {
              newValue = { city_name: "", city_id: "" };
            }
            context.onSelect(newValue, "t");
          }}
          defaultValue={{
            city_name: context.searchParams.to,
            city_id: context.searchParams.tCode
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
              value={context.selectedDate}
              onChange={context.handleDateChange.bind(this)}
              minDate={new Date()}
              clearable
              fullWidth
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <div className="">
          <button
            className="btn btn-primary btn-block"
            onClick={() => getBuses(props)}
          >
            SEARCH
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Search;
