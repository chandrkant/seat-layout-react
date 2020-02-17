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
  QUERYPARAMS
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
  listing: { availableTrips: [] },
  isLoading: true
};
const dateFormat = (date, f, Format = format) => {
  return Format(new Date(Date(date)), f);
};
const GlobalState = props => {
  const [state, dispatch] = useReducer(busReducer, init);
  const handleDateChange = date => {
    dispatch({ type: SET_DATE, value: date });
  };

  const sourceCitys = async () => {
    const data = await fetch(
      "https://api.railyatri.in/redbus/source-city-list.json"
    );
    const citys = await data.json();
    console.log(citys.city_list);
    dispatch({ type: CITIES, value: citys.city_list });
  };

  // const destCitys = async (id) => {
  //   // const destData = await fetch(
  //   //   `https://food1.railyatri.in/redbus/bus-destination-city.json?source_city_id=${id}`
  //   // );
  //   // const dCitys = await destData.json();
  //   // dispatch({ type: DESTCITIES, value: dCitys.city_list });
  // };

  const isEmpty = obj => {
    let valid = true;
    for (var key in obj) {
      if (obj[key] === "") {
        valid = false;
      }
    }
    return valid;
  };

  const getBusList = async () => {
    if (isEmpty(state.searchParams)) {
      const data = await fetch(
        `https://test.railyatri.in/redbus/get-available-trips.json?source=${state.searchParams.fCode}&destination=${state.searchParams.tCode}&doj=${state.searchParams.doj}&device_type_id=4&is_new_reduce_basefare=1`
      );
      const list = await data.json();
      dispatch({ type: LOADING, value: false });
      dispatch({ type: LIST, value: list });
    }
  };

  const onSelect = (option, type) => {
    if (type === "f") {
      destCitys(option.city_id)
    }
    dispatch({ type: PARAMS, value: { option: option, type: type } });
  };

  const destCitys = async (id) => {
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
        setQueryParams: setQueryParams
      }}
    >
      {props.children}
    </BusContext.Provider>
  );
};

export default GlobalState;
