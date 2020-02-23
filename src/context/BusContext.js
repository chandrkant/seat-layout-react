import React from "react";
import { format } from "date-fns";
export default React.createContext({
  searchParams: {
    from: "",
    to: "",
    fCode: "",
    tCode: "",
    doj: format(new Date(), "dd-MM-yyyy"),
    altDoj: format(new Date(), "dd MMM")
  },
  cities: [],
  destcities: [],
  selectedDate: new Date(),
  listing: {
    smartBus: [],
    nonSmartBus: [],
    isSmartRoute: true,
    currentTrip: {},
    currentBp: {},
    currentDp: {}
  },
  currentState: 1,
  isLoading: true,
  alert: { error: false, success: false, display: false },
  openDrower: false,
  handleDateChange: date => {},
  sourceCitys: () => {},
  onSelect: (option, type) => {},
  getBusList: props => {},
  getBuses: props => {},
  destCitys: id => {},
  handleAlertClose: () => {},
  setCurrentState: st => {},
  toggleDrawer: (event, open) => {}
});
