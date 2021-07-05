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
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";
import LiveCall from "../../components/LiveCall/LiveCall";
import CallStarter from "../../components/CallStarter/StartOrJoinCall"
import PreviousCalls from "../../components/CallStarter/PreviousCalls";

// const socket = io('http://localhost:5000');
// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const Call = ({isCallActive}) => {
  var classes = useStyles();
  const history = useHistory()


  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [mySocketId, setMySocketId] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {

    console.log(socket.id)
    setMySocketId(socket.id)

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  },[]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: mySocketId, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();
    history.push('/app/call/');
    window.location.reload();
  };

  return (
    <Grid container spacing={2}>
    {isCallActive &&
    <Grid item xs={12}>
    <LiveCall 
        name={name} 
        callAccepted={callAccepted} 
        myVideo={myVideo} 
        userVideo={userVideo} 
        callEnded={callEnded} 
        stream={stream} 
        setStream={setStream} 
        call={call} 
        answerCall={answerCall}
        leaveCall={leaveCall}
    />
    </Grid>
    }
    {!isCallActive && 
      <>
      <CallStarter 
      mySocketId={mySocketId} 
      callAccepted={callAccepted} 
      name={name} 
      setName={setName} 
      callEnded={callEnded} 
      leaveCall={leaveCall} 
      callUser={callUser} 
      />
      <Grid item xs={12}>
      <PreviousCalls />
      </Grid>
      </>
    }    
  </Grid>
  );
}

export default Call;
