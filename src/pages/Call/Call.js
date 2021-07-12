import React from "react";
import { useState, useRef, useEffect } from 'react';
import {useHistory} from "react-router-dom"
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { HashRouter ,Switch,Route,withRouter} from 'react-router-dom';
import { Grid, Paper } from "@material-ui/core";
import {socket} from "../../context/AuthContext"

// styles
import useStyles from "./styles";


// components
import LiveCall from "../../components/CallComponents/LiveCall";
import CallStarter from "../../components/CallComponents/StartOrJoinCall"
import PreviousCalls from "../../components/CallComponents/PreviousCalls";

// const socket = io('http://localhost:5000');
// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const Call = ({isCallActive}) => {
  var classes = useStyles();
  const history = useHistory()


  return (
    <Grid container spacing={2}>
    {isCallActive &&
    <LiveCall />
    }
    {!isCallActive && 
      <>
      <CallStarter />
      <Grid item xs={12}>
      <PreviousCalls />
      </Grid>
      </>
    }    
  </Grid>
  );
}

export default Call;
