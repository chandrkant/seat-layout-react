import React, { useState, useEffect } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
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
  console.log("Bus Listing");
  const items = [1, 2, 3, 4, 5, 6];
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="container-fluid">
      {items.map(i => (
        <div
          className={classes.root}
          key={i}
          style={{ display: isLoading ? "block" : "none" }}
        >
          <Skeleton animation="wave" />
          <Skeleton variant="rect" height={50} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      ))}
    </div>
  );
}
export default BusListing;
