import React, { useState, useEffect, useContext } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import BusContext from "../context/BusContext";
import queryString from "query-string";
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
  }
});
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
      <div className="col-xs-12">
        <ul>
          {context.listing.availableTrips.map(bus => (
            <li className="intrcity-list_card RY_smart_bus" key={bus.id}>
              <div className="bus-card marg-bot-15 pad-bot-10 shadow mweb-gro-bus-seats">
                {bus.travels}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
export default BusListing;
