import { format } from "date-fns";
export const PARAMS = "PARAMS";
export const CITIES = "CITIES";
export const SET_DATE = "SET_DATE";
export const LIST = "LIST";
export const LOADING = "LOADING";
export const QUERYPARAMS = "QUERYPARAMS";
export const DESTCITIES = "DESTCITIES";
export const ALERTS = "ALERTS";
const handleDateChange = (date, state) => {
  const params = {
    ...state.searchParams,
    doj: format(date, "dd-MM-yyyy"),
    altDoj: format(date, "MMM dd, yyyy")
  };
  const selectedDate = date;
  return { ...state, searchParams: params, selectedDate: selectedDate };
};
const onSelect = (option, type, state) => {
  if (option) {
    if (type === "f") {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          fCode: option.city_id,
          from: option.city_name
        }
      };
    } else {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          tCode: option.city_id,
          to: option.city_name
        }
      };
    }
  }
};

export const busReducer = (state, action) => {
  switch (action.type) {
    case SET_DATE:
      return handleDateChange(action.value, state);
    case PARAMS:
      return onSelect(action.value.option, action.value.type, state);
    case CITIES:
      return { ...state, cities: action.value };
    case LIST:
      return { ...state, listing: action.value };
    case LOADING:
      return { ...state, isLoading: action.value };
    case QUERYPARAMS:
      return { ...state, searchParams: action.value };
    case DESTCITIES:
      return { ...state, destcities: action.value };
    case ALERTS:
      return { ...state, alert: action.value };
    default:
      return state;
  }
};
