import React, { useEffect, useReducer } from "react";
import "./mobile.css";
import "bootstrap/dist/css/bootstrap.css";
const init = props => {
  return {
    birth: [],
    seatsData: {},
    tripId: props.match.params.trip_id,
    activeTab: true,
    showTabs: true,
    seats: [],
    fares: [],
    marginL: 0,
    marginU: 0
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEAT_DATA":
      return { ...state, seatsData: action.value };
    case "SET_SEATS":
      return { ...state, seats: action.value };
    case "SET_BERTH":
      return { ...state, birth: action.value };
    case "MRGINL":
      return { ...state, marginL: action.value };
    case "SHOW_TABS":
      return { ...state, showTabs: action.value };
    case "ACTIVE_TAB":
      return { ...state, activeTab: action.value };
    case "SET_FARES":
      return { ...state, fares: action.value };
    default:
      return state;
  }
};
export default function SeatLayout(props) {
  const [state, dispetch] = useReducer(reducer, props, init);
  const getLayout = async () => {
    const data = await fetch(
      `http://new.railyatri.in/v2/bus-seat-layout-json?trip_id=${state.tripId}&no_of_passengers=1&operator_id=28028&v_code=176&device_type_id=4&provider_id=5&is_new_reduce_basefare=1&request_src=mweb&user_id=-1578892000`
    );
    const tripData = await data.json();
    dispetch({ type: "SEAT_DATA", value: tripData });

    if (tripData.success) {
      dispetch({ type: "SET_BERTH", value: tripData.lower });
      dispetch({ type: "ACTIVE_TAB", value: true });
      dispetch({ type: "SET_FARES", value: tripData.fares });
      if (tripData.upper.length > 0) {
        dispetch({ type: "SHOW_TAB", value: true });
      }
    }
  };

  const setBirth = f => {
    if (f) {
      dispetch({ type: "SET_BERTH", value: state.seatsData.lower });
      dispetch({ type: "ACTIVE_TAB", value: f });
    } else {
      dispetch({ type: "SET_BERTH", value: state.seatsData.upper });
      dispetch({ type: "ACTIVE_TAB", value: f });
    }
  };

  const seatSelectedSeats = (seat, target) => {
    if (
      state.seats.filter(s => {
        return s.name === seat.name;
      }).length > 0 ||
      state.seats.length < 6
    ) {
      if (
        state.seats.filter(s => {
          return s.name === seat.name;
        }).length > 0
      ) {
        target.classList.remove("_1LG_");
        dispetch({
          type: "SET_SEATS",
          value: [
            ...state.seats.filter(s => {
              return s.name !== seat.name;
            })
          ]
        });
      } else {
        target.classList.add("_1LG_");
        dispetch({ type: "SET_SEATS", value: [...state.seats, seat] });
      }
    } else {
      alert("Max seat limit 6");
    }
  };

  const setWidth = () => {
    var mrl,
      mru = 0;
    if (state.birth.length > 0) {
      mrl =
        (document
          .getElementById("mobile_lower")
          .querySelectorAll(".seats_row")[0].offsetWidth -
          document
            .getElementById("mobile_lower")
            .querySelectorAll(".seats_row_spc").length *
            45) /
        2;
      dispetch({ type: "MRGINL", value: mrl });
    }
    if (state.seats.length > 0) {
      state.seats.map(s =>
        document.getElementById(s.name) !== null
          ? document.getElementById(s.name).classList.add("_1LG_")
          : ""
      );
    }
  };
  const setFilterFare = f => {};
  useEffect(() => {
    getLayout();
  }, []);
  useEffect(() => {
    setWidth();
  }, [state.birth]);

  return (
    <div>
      <div className="col-xs-12 text-center fare-filter-blk">
        <ul className="fare-filter">
          <li className="activeli" onClick={e => setFilterFare(0)}>
            All
          </li>
          {state.fares.map(f => (
            <li className="" onClick={e => setFilterFare(f)} key={f}>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="tab-btn-blk col-xs-12 text-center"
        style={{ display: state.showTabs ? "block" : "none" }}
      >
        <button
          onClick={() => setBirth(true)}
          className={
            state.activeTab
              ? "btn btn-primary tab-btn"
              : "btn btn-default tab-btn"
          }
        >
          Lower
        </button>
        <button
          onClick={() => setBirth(false)}
          className={
            !state.activeTab
              ? "btn btn-primary tab-btn"
              : "btn btn-default tab-btn"
          }
        >
          Upper
        </button>
      </div>
      <div className="tab-content">
        <img
          id="loading"
          className="steering"
          src="https://rytest.storage.googleapis.com/assets/bus_web/seat-layout/bus-steering-9a6643844547093c3ee12395a4dc1335552584b3fd83a30ac48f4b704f38f0cb.png"
          alt="Bus steering"
        ></img>
        <img
          id="bus-front"
          className="img-responsive"
          src="https://rytest.storage.googleapis.com/assets/bus_web/seat-layout/bus-dashboard-8280a5ff3fc4e0916aff60d59d3b163e9586070bbafe06071a0f2383d9a34718.png"
          alt="Bus dashboard"
        />
        <div id="bus-leftside"></div>
        <div id="bus-rightside"></div>

        <div className="bus-seats">
          <div id="mobile_lower">
            <div className="seats_row">
              <div
                className="temp-lower"
                style={{ marginLeft: `${state.marginL}px` }}
              >
                {(state.birth || []).map((row, index) => (
                  <div
                    className="col-xs-2 seats_row_spc"
                    key={"lower_" + index}
                  >
                    {row.map(seat => (
                      <div className="seat-wrap" key={seat.name}>
                        <div className={seat.css_1}>
                          <div
                            id={seat.name}
                            className={seat.css_2}
                            onClick={e =>
                              seatSelectedSeats(seat, e.currentTarget)
                            }
                          >
                            <span className="seat-name">{seat.name}</span>
                            <span className={seat.span_1}></span>
                            <span className={seat.span_2}></span>
                            <span className={seat.span_2}></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img
            id="bus-end"
            className="img-responsive"
            src="https://rytest.storage.googleapis.com/assets/bus_web/seat-layout/bus-tailend-de06ba9d8e6c96c555d4da707543acf2415b287b65a1ef25c6c05a9a9d07768c.png"
            alt="Bus tailend"
          ></img>
        </div>
      </div>
    </div>
  );
}
