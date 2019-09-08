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
// import { minHeight } from "@material-ui/system";

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
  const [item, setItem] = React.useState({});

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

  let cities = {
    atl: states[0],
    new: states[1],
    ams: states[2],
    lon: states[4]
  };

  console.log(item, ">>>>>>>>>>>>");

  const handleClickOpen = city => {
    switch (city) {
      case "atl":
        setItem(cities.atl);
        break;
      case "new":
        setItem(cities.new);
        break;
      case "ams":
        setItem(cities.ams);
        break;
      case "lon":
        setItem(cities.lon);
        break;
      default:
        setItem(cities.atl);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(states);

  return (
    <div>
      <div className="container">
        <List className={classes.root}>
          <div onClick={() => handleClickOpen("atl")}>
            <ListItem style={{ cursor: "pointer" }} className="list">
              <ListItemAvatar>
                <Avatar>
                  <FlightIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Atalanta" />
            </ListItem>
          </div>
          <div onClick={() => handleClickOpen("new")}>
            <ListItem style={{ cursor: "pointer" }} className="list">
              <ListItemAvatar>
                <Avatar>
                  <FlightIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="New York LGA" />
            </ListItem>
          </div>
          <div onClick={() => handleClickOpen("ams")}>
            <ListItem
              // onClick={handleClickOpen}
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
          </div>
          <div onClick={() => handleClickOpen("lon")}>
            <ListItem
              // onClick={handleClickOpen}
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
          </div>
        </List>
      </div>
      {open && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Flights Info {}
          </DialogTitle>
          <DialogContent dividers>
            <Typographyl item={item} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Dashboard;
