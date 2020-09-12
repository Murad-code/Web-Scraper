import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import {
  useGoogleLogin,
  useGoogleLogout,
} from "react-google-login";

const useStyles = makeStyles((theme) => ({
  google: {
    width: "100%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function Hero() {
  const classes = useStyles();
  const [isSignedIn, setSignInStatus] = useState(false);
  const clientId =
    "1076567886140-vh4l3s8s5sqmch2ct1cigmrrhcmpntor.apps.googleusercontent.com";

  const onSuccess = (res) => {
    console.log("in success");
    setSignInStatus(true);
  };

  const onLogoutSuccess = (res) => {
    console.log("logout successful");
    setSignInStatus(false);
  };

  const onFailure = (res) => {
    console.log("in failure");
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
  });

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const SignInBtn = () => {
    return <button onClick={signOut}>Sign out</button>;
  };

  const SignOutBtn = () => {
    return (
      <button onClick={signIn}>
        <img src="./google.svg" alt="icon" className={classes.google} />
        <span>Sign into Google</span>
      </button>
    );
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Add your item
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Insert a link below to add to your wish list!
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Add
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center">
            <Grid item>{isSignedIn ? <SignInBtn /> : <SignOutBtn />}</Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
