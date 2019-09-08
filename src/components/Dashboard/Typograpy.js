import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class Typograpyl extends Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <Typography gutterBottom>
          <Button color="primary" variant="contained">
            Estimated Departure airport{" "}
          </Button>
          {item.estDepartureAirport}
        </Typography>
        <Typography gutterBottom>
          <Button color="primary" variant="contained">
            Estimated Arrival airport{" "}
          </Button>
          {item.estArrivalAirport}
        </Typography>
        <Typography gutterBottom>
          <Button color="primary" variant="contained">
            Date first Seen{" "}
          </Button>
          {item.firstSeen}
        </Typography>
      </div>
    );
  }
}
