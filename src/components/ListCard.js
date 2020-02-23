import React, { useContext } from "react";
import { format } from "moment";
// import BusContext from "../context/BusContext";
import { makeStyles, Card, Grid } from "@material-ui/core";
import "./bus-list.css";
import BusContext from "../context/BusContext";
const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "auto 0",
    padding: "5px",
    clear: "both",
    position: "relative",
    top: "5%",
    bottom: "2%"
  },
  troot: {
    minWidth: 275,
    margin: "10px",
    padding: "15px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  gridPad: {
    padding: "5px",
    textAlign: "left"
  },
  padLLt10: {
    paddingLeft: "10px",
    textAlign: "left"
  },
  padRRt10: {
    paddingRight: "10px",
    textAlign: "right"
  },
  nonRypriceRt: {
    padding: "10px 10px 0 0",
    textAlign: "right"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});
export default function ListCard(props) {
  const classes = useStyles();
  const context = useContext(BusContext);
  const goToSeatLayout = (props, id) => {
    context.setCurrentState(2);
    props.history.push(`/seat-layout/${id}`);
  };
  return (
    <React.Fragment>
      <div>
        {props.buses.map(bus => (
          <Card
            key={bus.id}
            className={classes.troot}
            onClick={event => context.toggleDrawer(event, true)} //goToSeatLayout(props, bus.id)}
          >
            <Grid container spacing={0}>
              <Grid item xs={10} className={classes.gridPad}>
                <p className="fw-500 black-txt">{bus.travels}</p>
              </Grid>
              <Grid container>
                <Grid item xs={5} className="text-left">
                  <div
                    className={
                      bus.RY_smart_bus ? "intrcity-list_card-time" : "hide"
                    }
                  >
                    <p className="black-txt font-md fw-500">
                      {bus.arrivalTime} <span className="fs11">PM</span>
                    </p>
                    <p className="l-grey font-xs pad-top-10">
                      {bus.departureTime} <span className="fs11">AM</span>
                    </p>
                  </div>
                  <div className={bus.RY_smart_bus ? "hide" : ""}>
                    <div className="bus-model">
                      {bus.AC === "true" && bus.luxary === "false" ? (
                        <span>AC</span>
                      ) : (
                        ""
                      )}

                      {bus.bus_tags.map(tag => (
                        <span key={`${bus.id}-${tag}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="bus-ry_details">
                      <div className="l-grey bus-ry_score">
                        <span style={{ display: "none" }}>
                          <span className="font-xxs bus-ry_score-no"></span>
                          <span className="font-xxs bus-ry_score-content">
                            RY Score
                          </span>
                          |
                        </span>
                        <span className="font-xxs bus-ry_seats">
                          {bus.availableSeats} Seat(s)
                        </span>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={7}>
                  <div
                    className={
                      bus.RY_smart_bus
                        ? "no-padrt text-right intrcity-list_card-seatinfo"
                        : "hide"
                    }
                  >
                    <p className="l-grey fs11">{bus.availableSeats} Seat(s)</p>
                    <p className="l-grey fs11 pad-bot-10">
                      <span>
                        {bus.AC === "true" && bus.luxary === "false"
                          ? "AC,"
                          : ""}
                        {bus.bus_tags.join(",")}
                      </span>
                    </p>
                    <p className="intrcity-amn">
                      {(bus.smart_bus_display_amenities || []).map(amnt => (
                        <img
                          src={`${amnt.img_url}`}
                          alt={`${amnt.hover_text}`}
                          width="20px"
                          height="15px"
                          key={`${bus.id}-${amnt.hover_text}`}
                        />
                      ))}
                    </p>
                  </div>
                  <div
                    className={
                      bus.RY_smart_bus ? "hide" : "no-padlt text-right"
                    }
                  >
                    <p className="bus-deptime">{bus.arrivalTime} PM</p>
                    <p className="l-grey bus-arrtime">{bus.departureTime} AM</p>
                    <p className="l-grey bus-durtime fs10">6 hrs</p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid container className="pad-top-10 pickup-pop" spacing={0}>
                <Grid item className={classes.padLLt10} xs={8}>
                  <Grid item className="no-pad pickup-popLT fx-wid" xs={12}>
                    {bus.boardingTimes[0].bpName}
                  </Grid>
                  <label className="l-grey font-xxs">
                    {bus.boardingTimes.length > 1
                      ? `${bus.boardingTimes.length - 1} more Boarding Point`
                      : ""}
                    <span className="board_caret">
                      <i
                        className="fa fa-angle-down"
                        style={{ verticalAlign: "middle", marginLeft: "4px" }}
                      ></i>
                    </span>
                  </label>
                </Grid>
                <Grid
                  item
                  className="no-padrt text-right pickup-popRT pad-rt-10"
                  xs={4}
                >
                  <span className="black-txt bus-orgprice">
                    {bus.fareDetails.map(fare => (
                      <span className="strikethrough" key={`{bus.id}-basFare`}>
                        ₹ {fare.baseFare}{" "}
                      </span>
                    ))}
                  </span>
                  {bus.fareDetails.map(fare => (
                    <span
                      className="fw-500 black-txt font-sm bus-disprice"
                      key={`{bus.id}-disbasFare`}
                    >
                      ₹{" "}
                      {parseInt(fare.baseFare) -
                        parseInt(bus.auto_apply_coupon.min_discount)}
                    </span>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
}
