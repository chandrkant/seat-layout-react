import React, { useContext } from "react";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Grid
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AccountCircle from "@material-ui/icons/AccountCircle";
import BusContext from "../../context/BusContext";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import "./nav.css";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#004b9e"
  },
  navBack: {
    background: "#004F9E",
    minHeight: "60px"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  ryLogo: {
    maxWidth: "205px"
  },
  iconSize: {
    fontSize: "1rem",
    height: "0.9rem"
  },
  calVish: {
    color: "#fff",
    border: 0,
    outline: "none",
    width: "50%"
  },
  navTitle: {
    margin: "auto",
    flexGrow: 1
  },
  userLogo: {
    margin: "auto"
  },
  multiinputBorder: {
    borderBottom: "0 !important"
  }
}));

export default function Nav(props) {
  const classes = useStyles();
  const context = useContext(BusContext);
  const handleChange = event => {
    // setAuth(event.target.checked);
  };

  const handleMenu = event => {
    // setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.navBack}>
          <Toolbar>
            <Grid container spacing={0}>
              <Grid item xs={1}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={e => window.history.back(-1)}
                >
                  {context.currentState === 1 ? (
                    <MenuIcon />
                  ) : (
                    <ArrowBackIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={7} className={classes.navTitle}>
                <Typography
                  variant="h6"
                  className={
                    context.currentState === 1 ? classes.navTitle : "hide"
                  }
                >
                  <img
                    className={classes.ryLogo}
                    alt="railyatri logo icon"
                    width="270px"
                    src="https://images.railyatri.in/ry_images_prod/smartbus-logo-1579152662.png"
                  ></img>
                </Typography>
                <Typography
                  variant="h6"
                  className={
                    context.currentState === 2 ? classes.navTitle : "hide"
                  }
                >
                  <p>
                    <span className="title-case">
                      {context.searchParams.from}
                    </span>{" "}
                    <span className="arrow-forw">-</span>{" "}
                    <span className="title-case">
                      {context.searchParams.to}
                    </span>
                  </p>
                </Typography>
              </Grid>
              <Grid item xs={4} className={classes.userLogo}>
                {context.currentState === 2 ? (
                  <div className="arror-dates">
                    <ArrowBackIosIcon className={classes.iconSize} />
                    <MuiPickersUtilsProvider
                      utils={MomentUtils}
                      className={classes.multiinputBorder}
                    >
                      <DatePicker
                        className={classes.calVish}
                        format="DD MMM"
                        value={context.selectedDate}
                        onChange={context.handleDateChange.bind(this)}
                        minDate={new Date()}
                        autoOk
                      />
                    </MuiPickersUtilsProvider>
                    <ArrowForwardIosIcon className={classes.iconSize} />
                  </div>
                ) : (
                  <AccountCircle />
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
