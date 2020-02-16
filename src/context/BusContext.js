import React from "react";
import { format } from "date-fns";
export default React.createContext({
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
  listing: { availableTrips: [] },
  isLoading: true,
  handleDateChange: date => {},
  sourceCitys: () => {},
  onSelect: (option, type) => {},
  getBusList: props => {},
  getBuses: props => {}
});
