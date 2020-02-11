import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

function Search(props) {
  console.log("Search Page");
  const [cities, setCities] = useState([]);
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    fCode: "",
    tCode: "",
    doj: format(new Date(), "dd-MM-yyyy"),
    altDoj: format(new Date(), "MMM dd, yyyy")
  });
  const [list, setList] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => {
    setSearchParams({
      ...searchParams,
      doj: format(date, "dd-MM-yyyy"),
      altDoj: date
    });
    setSelectedDate(date);
    getBusList(props);
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
    getBusList(props);
  };
  const getBusList = props => {
    if (isEmpty(searchParams)) {
      fetch(
        `https://test.railyatri.in/redbus/get-available-trips.json?source=${searchParams.fCode}&destination=${searchParams.tCode}&doj=${searchParams.doj}&device_type_id=4&is_new_reduce_basefare=1`
      ).then(resp => {
        setList(resp.json());
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
    if (isEmpty(searchParams)) {
      props.handalParams(searchParams);
      props.handalBusList(list);
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
            value={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            clearable
            fullWidth
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <div className="">
        <button className="btn btn-primary" onClick={() => getBuses(props)}>
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default Search;
