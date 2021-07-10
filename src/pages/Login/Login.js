import React, { useState, useContext } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import google from "../../images/google.svg";

// context
import UserContext from "../../context/AuthContext";

function Login(props) {
  var classes = useStyles();

  // global
  // var userDispatch = useUserDispatch();
  const { userSignUp, userSignIn} = useContext(UserContext)

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [signupFirstNameValue, setSignupFirstNameValue] = useState("NT");
  const [signupLastNameValue, setSignupLastNameValue] = useState("1");
  const [signupEmailValue, setSignupEmailValue] = useState("nt1@teamsclone.com");
  const [signupPasswordValue, setSignupPasswordValue] = useState("1");
  const [loginEmailValue, setLoginEmailValue] = useState("firoz@teamsclone.com");
  const [loginPasswordValue, setLoginPasswordValue] = useState("12345678");

  const sigUpHandler = () =>{
    setError(false);
    setIsLoading(true);
    userSignUp(
      signupFirstNameValue,
      signupLastNameValue,
      signupEmailValue,
      signupPasswordValue,
      props.history,
      setIsLoading,
      setError,
    )
    .then (() => {
      setError(false)
      setIsLoading(false)
    }
    )
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <Typography className={classes.logotypeText} align="center">Welcome to Teams Clone</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome back!
              </Typography>
              <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginEmailValue}
                onChange={e => setLoginEmailValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginPasswordValue}
                onChange={e => setLoginPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginEmailValue.length === 0 || loginPasswordValue.length === 0
                    }
                    onClick={() =>
                      userSignIn(
                        loginEmailValue,
                        loginPasswordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Login
                  </Button>
                )}
                
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="firstName"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={signupFirstNameValue}
                onChange={e => setSignupFirstNameValue(e.target.value)}
                margin="normal"
                placeholder="First Name"
                type="text"
                fullWidth
              />
              <TextField
              id="lastName"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={signupLastNameValue}
              onChange={e => setSignupLastNameValue(e.target.value)}
              margin="normal"
              placeholder="Last Name"
              type="text"
              fullWidth
            />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={signupEmailValue}
                onChange={e => setSignupEmailValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={signupPasswordValue}
                onChange={e => setSignupPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={sigUpHandler}
                    disabled={
                      signupEmailValue.length === 0 ||
                      signupPasswordValue.length === 0 ||
                      signupFirstNameValue.length === 0 ||
                      signupLastNameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
