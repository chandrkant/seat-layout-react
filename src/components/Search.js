import React, { useEffect, useContext } from "react";
import { TextField, Grid, Card, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import BusContext from "../context/BusContext";
import "./search.css";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "10px",
    padding: "15px",
    borderRadius: "4px",
    boxShadow: "0 2px 5px 2px rgba(0, 0, 0, 0.1)"
  }
});
function Search(props) {
  const classes = useStyles();
  const context = useContext(BusContext);
  const defaultProps = {
    getOptionLabel: option => option.city_name,
    filterOptions: (options, state) => {
      if (state.inputValue.length > 1) {
        return options.filter(city => {
          return city.city_name.toLowerCase().startsWith(state.inputValue);
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
    context.setCurrentState(1);
    context.sourceCitys();
  }, []);

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <div className="search-block">
          <div className="search-contener">
            <Autocomplete
              options={context.cities}
              {...defaultProps}
              id="from-city"
              value={{
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
              value={{
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
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container justify="space-around">
                <DatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MMM DD, YYYY"
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
                className="btn btn-primary btn-block search-btn"
                onClick={() => getBuses(props)}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
}

export default Search;
