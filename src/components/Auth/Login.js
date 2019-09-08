import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import "./Login.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: "grid",
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    gridTemplateRows: "1fr",
    marginRight: "30px"
  },
  tega: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  },
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function Login() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    name: "",
    redirect: true,
    nameError: "invalid username",
    passwordError: "invalid password"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const userData = {
      name: values.name,
      password: values.password
    };

    if (values.name && values.password !== "demo") {
      alert("Invalid username or password");
    }
    else{
      window.location.href = "/dashboard";
    }
    console.log(userData);
  };

  return (
    <div className={classes.root}>
      <h1 className="login">Login</h1>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            InputLabelProps={{
              shrink: true
            }}
          >
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label="Name"
                className={classes.textField}
                name="name"
                onChange={handleChange("name")}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                name="password"
                autoComplete="current-password"
                onChange={handleChange("password")}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                variant="outlined"
              />
              <div className={classes.tega}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleSubmit}
                >
                  Login &nbsp;&nbsp;
                  <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
