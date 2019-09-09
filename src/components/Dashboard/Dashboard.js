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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typographyl from "./Typograpy";
import axios from "axios";
import "./Dashboard.css";
import pl from "./aeroplane-aircraft-aircraft-wing-723240(1).jpg";
import am from "./aeroplane-aircraft-airline-912050.jpg";
import lo from "./aeroplanes-aircraft-airline-163792.jpg";
import te from "./airport-architectural-design-architecture-2610756.jpg";
//import { minHeight } from "@material-ui/system";

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

const useStyles = makeStyles({
  card: {
    maxWidth: 350
  },
  media: {
    height: 250
  },
  body: {
    color: 500
  }
});

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
        <Grid container spacing={3}>
          <Grid item xs>
            <div>
              <Card
                className={classes.card}
                onClick={() => handleClickOpen("atl")}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={pl}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Atalanta
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Grid>

          <Grid item xs>
            <div>
              <Card
                className={classes.card}
                onClick={() => handleClickOpen("new")}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={am}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      New York
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Grid>
          <Grid item xs>
            <div>
              <Card
                className={classes.card}
                onClick={() => handleClickOpen("ams")}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={te}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Amsterdam
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Grid>
          <Grid item xs>
            <div>
              <Card
                className={classes.card}
                onClick={() => handleClickOpen("lon")}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={lo}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      London
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>

      {open && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          aria-describedby="alert-dialog-description"
          open={open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            className="heading"
          >
            Flights Info {}
          </DialogTitle>
          <DialogContent dividers className={classes.body}>
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
