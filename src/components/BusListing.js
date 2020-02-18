import React, { useEffect, useContext } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import BusContext from "../context/BusContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import queryString from "query-string";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./bus-list.css";
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
    if (context.searchParams.from.length === 0) {
      context.setQueryParams(params);
    }
    context.getBusList();
  }, [context.searchParams.from, context.searchParams.to]);
  console.log("Bus Listing");
  const items = [1, 2, 3, 4, 5, 6];
  const classes = useStyles();

  return (
    <React.Fragment>
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
        {context.listing.smartBus.map(bus => (
          <Card key={bus.id} className={classes.troot}>
            <CardContent>{bus.travels}</CardContent>
          </Card>
        ))}
      </div>
      <div className="No-RY-blk">
        {context.listing.nonSmartBus.map(bus => (
          <Card key={bus.id} className={classes.troot}>
            <CardContent>{bus.travels}</CardContent>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
}
export default BusListing;
