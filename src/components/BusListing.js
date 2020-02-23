import React, { useEffect, useContext } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles, Snackbar, Card, Grid } from "@material-ui/core";
import BusContext from "../context/BusContext";
import MuiAlert from "@material-ui/lab/Alert";
import queryString from "query-string";
import "./bus-list.css";
import ListCard from "./ListCard";
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
    margin: "10px"
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
  }
});
const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
function BusListing(props) {
  const context = useContext(BusContext);
  const search = queryString.parse(props.location.search);
  const params = { ...search, ...props.match.params };
  useEffect(() => {
    if (context.currentState !== 3) {
      if (context.searchParams.from.length === 0) {
        context.setQueryParams(params);
      }
      context.setCurrentState(2);
      context.getBusList();
    }
  }, [
    context.searchParams.from,
    context.searchParams.to,
    context.searchParams.doj
  ]);
  console.log("Bus Listing");
  const items = [1, 2, 3, 4, 5, 6];
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="intrcity-top">
        <Grid container spacing={0} className="logo">
          <img
            alt=""
            width=""
            height=""
            src="https://images.railyatri.in/ry_images_prod/intrcity-logo-1569326536.png"
            className="img-responsive"
          />
        </Grid>
        <Grid container spacing={0} className="promo">
          <img
            alt=""
            width=""
            height=""
            src="https://images.railyatri.in/ry_images_prod/Presenting-1568111143.png"
            className="img-responsive"
          />
        </Grid>
      </div>

      <Snackbar
        open={context.alert.success && context.alert.display}
        autoHideDuration={6000}
        onClose={context.handleAlertClose}
      >
        <Alert onClose={context.handleAlertClose} severity="success">
          {context.listing.availableTrips.length} Buses Found.
        </Alert>
      </Snackbar>
      <Snackbar
        open={context.alert.error && context.alert.display}
        autoHideDuration={6000}
        onClose={context.handleAlertClose}
      >
        <Alert onClose={context.handleAlertClose} severity="error">
          {context.listing.availableTrips.length} Buses Found.
        </Alert>
      </Snackbar>
      <div className="container-fluid">
        {items.map(i => (
          <div
            className={classes.root}
            key={i}
            style={{ display: context.isLoading ? "block" : "none" }}
          >
            <Skeleton animation="wave" />
            <Skeleton variant="rect" height={50} />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </div>
        ))}
      </div>
      <div className="clearfix"></div>
      <div className="intrcity-blk">
        <ListCard {...props} buses={context.listing.smartBus}></ListCard>
      </div>
      <div className="No-RY-blk">
        <Card className={classes.troot}>
          <div className="col-xs-12 shadow more-bus_list-head">
            <div className="row">
              <div className="col-xs-3 no-pad">
                <p className="no-marg white-txt oth-bs-cot font-sm fw-500">
                  {context.listing.nonSmartBus.length}
                </p>
                <p className="font-xxs" style={{ color: "rgb(153, 153, 153)" }}>
                  Other Buses
                </p>
                <p></p>
              </div>
              <div className="col-xs-9 no-pad">
                <div className="sort-tab text-right">
                  <a
                    className="tab-optn active-tab"
                    style={{ marginRight: "3px" }}
                  >
                    Price
                    <i
                      aria-hidden="true"
                      className="fa fa-sort-amount-asc fs10 sort-itm"
                    ></i>
                  </a>
                  <a className="tab-optn">
                    Departure
                    <i
                      aria-hidden="true"
                      className="fa fa-sort-amount-asc sort-itm"
                    ></i>
                  </a>
                  <a className="tab-optn hide">
                    Duration{" "}
                    <i
                      aria-hidden="true"
                      className="fa fa-sort-amount-asc sort-itm"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <ListCard {...props} buses={context.listing.nonSmartBus}></ListCard>
      </div>
    </React.Fragment>
  );
}
export default BusListing;
