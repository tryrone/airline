import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FlightIcon from "@material-ui/icons/Flight";
import Typographyl from "./Typograpy";
import axios from "axios";
import "./Dashboard.css";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [states, setStates] = React.useState([]);

  useEffect(() => {
    let end = Math.round(new Date().getTime() / 1000) - 24 * 3600;

    let begin = end - 60 * 60;
    axios
      .get(
        `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
      )
      .then(res => {
        setStates(res.data);
      });
  }, []);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log(states);

  let flight01;
  // let arrival;
  // let firstSeen;

  // var vals = [];
  // for (var item of states) {
  //   // vals.push(item.estDepartureAirport);
  //   flight01 = item.estDepartureAirport;
  //   arrival = item.estArrivalAirport;
  //   firstSeen = item.firstSeen;
  // }

  states.map((item, key) => {
    // flight01 = element.estDepartureAirport;
    // arrival = element.estArrivalAirport;
    // firstSeen = element.firstSeen;
    return (flight01 = <Typographyl key={item.firstSeen} item={item} />);
  });

  // let rows = vals.length;
  // for (let i = 0; i < rows; i++) {
  //   let items = vals[i];
  //   console.log(items);

  //   flight01 = items;
  // }

  // console.log(vals);

  // states.map(flight => {
  //   return (flight01 = (
  //     <div>
  //       <Typography gutterBottom key={flight.firstSeen}>
  //         <Button color="primary" variant="contained">
  //           Estimated Departure airport{" "}
  //         </Button>
  //         {flight.estDepartureAirport}
  //       </Typography>
  //       <Typography gutterBottom>
  //         {" "}
  //         <Button color="primary" variant="contained">
  //           Estimated Arrival airport:
  //         </Button>
  //         {flight.estArrivalAirport}
  //       </Typography>
  //       <Typography>
  //         <Button color="primary" variant="contained">
  //           Estimated Number of near-by Airports
  //         </Button>
  //         {flight.departureAirportCandidatesCount}
  //       </Typography>
  //     </div>
  //   ));
  // });
  return (
    <div>
      <div className="container">
        <List className={classes.root}>
          <ListItem
            onClick={handleClickOpen}
            style={{ cursor: "pointer" }}
            className="list"
          >
            <ListItemAvatar>
              <Avatar>
                <FlightIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Atalanta" />
          </ListItem>
          <ListItem
            onClick={handleClickOpen}
            style={{ cursor: "pointer" }}
            className="list"
          >
            <ListItemAvatar>
              <Avatar>
                <FlightIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="New York LGA" />
          </ListItem>
          <ListItem
            onClick={handleClickOpen}
            style={{ cursor: "pointer" }}
            className="list"
          >
            <ListItemAvatar>
              <Avatar>
                <FlightIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Amsterdam" />
          </ListItem>
          <ListItem
            onClick={handleClickOpen}
            style={{ cursor: "pointer" }}
            className="list"
          >
            <ListItemAvatar>
              <Avatar>
                <FlightIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="London" />
          </ListItem>
        </List>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Flights Info
        </DialogTitle>
        <DialogContent dividers>
          {flight01}
          {/* <Typography gutterBottom>
            <Button color="primary" variant="contained">
              Estimated Departure airport{" "}
            </Button>
            {flight01}
          </Typography> */}
          {/* <Typography gutterBottom>
            <Button color="primary" variant="contained">
              Estimated Arrival airport{" "}
            </Button>
            {arrival}
          </Typography>
          <Typography gutterBottom>
            <Button color="primary" variant="contained">
              Date first Seen{" "}
            </Button>
            {firstSeen}
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dashboard;
