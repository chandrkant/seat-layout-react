import React, { useEffect, useState } from "react";
import "date-fns";
import "bootstrap/dist/css/bootstrap.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
function Search(props) {
  const theme = createMuiTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 14
    }
  });
  const [cities, setCities] = useState([]);
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    fCode: "",
    tCode: "",
    doj: ""
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSearchParams({
      ...searchParams,
      doj: date.toLocaleDateString().split('/').join('-')
    });
    setSelectedDate(date);
  };

  const defaultProps = {
    options: cities,
    getOptionLabel: option => option.city_name
  };

  const sourceCitys = async () => {
    const data = await fetch(
      "https://api.railyatri.in/redbus/source-city-list.json"
    );
    const city = await data.json();
    setCities(city.city_list);
  };

  const onSelect = (option, type) => {
    if (option) {
      if (type === "f") {
        setSearchParams({
          ...searchParams,
          fCode: option.city_id,
          from: option.city_name
        });
      } else {
        setSearchParams({
          ...searchParams,
          tCode: option.city_id,
          to: option.city_name
        });
      }
    }
  };
  const getBusList =async () => {
    if (isEmpty(searchParams)) {
      const data = await fetch(`https://test.railyatri.in/redbus/get-available-trips.json?source=${searchParams.fCode}&destination=${searchParams.tCode}&doj=${searchParams.doj}&device_type_id=4&is_new_reduce_basefare=1`)
      const buslist = await data.json();
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
    if (isEmpty(searchParams)) {
      props.handalParams(searchParams);
      props.history.push(
        `/bus-listing/${searchParams.from}-to-${searchParams.to}-buses`
      );
    } else {
    }
  };

  useEffect(() => {
    sourceCitys();
  }, []);

  return (
    <div className="container-fluid">
      <MuiThemeProvider theme={theme}>
        <Autocomplete
          {...defaultProps}
          id="from-city"
          clearOnEscape
          onChange={(event, newValue) => {
            onSelect(newValue, "f");
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
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              fullWidth
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
      <div className="">
        <button className="btn btn-primary" onClick={() => getBuses(props)}>
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default Search;
