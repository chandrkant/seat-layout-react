import React, { useReducer } from "react";
import { format } from "date-fns";
import BusContext from "./BusContext";
import {
  busReducer,
  PARAMS,
  CITIES,
  DESTCITIES,
  SET_DATE,
  LIST,
  LOADING,
  QUERYPARAMS,
  ALERTS
} from "./Reducers";
const init = {
  searchParams: {
    from: "",
    to: "",
    fCode: "",
    tCode: "",
    doj: format(new Date(), "dd-MM-yyyy"),
    altDoj: format(new Date(), "MMM dd, yyyy")
  },
  cities: [],
  destcities: [],
  selectedDate: new Date(),
  listing: {
    availableTrips: [],
    smartBus: [],
    nonSmartBus: [],
    isSmartRoute: true,
    currentTrip: {},
    currentBp: {},
    currentDp: {}
  },
  isLoading: true,
  alert: { error: false, success: false, display: false }
};
const dateFormat = (date, f, Format = format) => {
  return Format(new Date(Date(date)), f);
};
const GlobalState = props => {
  const [state, dispatch] = useReducer(busReducer, init);
  const handleDateChange = date => {
    dispatch({ type: SET_DATE, value: date });
  };
  const handleAlertClose = () => {
    dispatch({
      type: ALERTS,
      value: { error: false, success: false, display: false }
    });
  };

  //Get source city list
  const sourceCitys = async () => {
    const data = await fetch(
      "https://food1.railyatri.in/redbus/source-city-list.json"
    );
    const citys = await data.json();
    console.log(citys.city_list);
    dispatch({ type: CITIES, value: citys.city_list });
  };

  //check object key has values
  const isEmpty = obj => {
    let valid = true;
    for (var key in obj) {
      if (obj[key] === "") {
        valid = false;
      }
    }
    return valid;
  };

  // get bus listing based on parameters
  const getBusList = async () => {
    if (isEmpty(state.searchParams)) {
      restListing();
      const data = await fetch(
        `https://food1.railyatri.in/redbus/get-available-trips.json?source=${state.searchParams.fCode}&destination=${state.searchParams.tCode}&doj=${state.searchParams.doj}&device_type_id=4&is_new_reduce_basefare=1`
      );
      const list = await data.json();
      if (list.availableTrips.length > 0) {
        dispatch({
          type: ALERTS,
          value: { error: false, success: true, display: true }
        });
        dispatch({
          type: LIST,
          value: {
            ...list,
            smartBus: list.availableTrips.filter(trip => trip.RY_smart_bus),
            nonSmartBus: list.availableTrips.filter(trip => !trip.RY_smart_bus),
            isSmartRoute: list.is_smart_route,
            currentTrip: {},
            currentBp: {},
            currentDp: {}
          }
        });
      } else {
        dispatch({
          type: ALERTS,
          value: { error: true, success: false, display: true }
        });
      }
      dispatch({ type: LOADING, value: false });
    }
  };

  const restListing = () => {
    dispatch({
      type: LIST,
      value: {
        availableTrips: [],
        smartBus: [],
        nonSmartBus: [],
        isSmartRoute: true,
        currentTrip: {},
        currentBp: {},
        currentDp: {}
      }
    });
  };

  const onSelect = (option, type) => {
    if (type === "f" && option.city_name.length > 0) {
      destCitys(option.city_id);
    }
    dispatch({ type: PARAMS, value: { option: option, type: type } });
  };

  const destCitys = async id => {
    const destData = await fetch(
      `https://food1.railyatri.in/redbus/bus-destination-city.json?source_city_id=${id}`
    );
    const dCitys = await destData.json();
    dispatch({ type: DESTCITIES, value: dCitys.city_list });
  };
  const setQueryParams = params => {
    dispatch({
      type: QUERYPARAMS,
      value: { ...params, altDoj: dateFormat(params.doj, "MMM dd, yyyy") }
    });
  };
  return (
    <BusContext.Provider
      value={{
        searchParams: state.searchParams,
        cities: state.cities,
        destcities: state.destcities,
        selectedDate: state.selectedDate,
        listing: state.listing,
        isLoading: state.isLoading,
        handleDateChange: handleDateChange,
        sourceCitys: sourceCitys,
        onSelect: onSelect,
        getBusList: getBusList,
        setQueryParams: setQueryParams,
        handleAlertClose: handleAlertClose,
        alert: state.alert
      }}
    >
      {props.children}
    </BusContext.Provider>
  );
};

export default GlobalState;
