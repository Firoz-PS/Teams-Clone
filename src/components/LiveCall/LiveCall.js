import React from "react";
import { useContext, useEffect, useState } from "react";
// import { SocketContext } from "../../context/CallContext"
import { Grid, Paper, Button, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Mic, MicOff, Videocam, VideocamOff, CallEnd} from "@material-ui/icons";

// styles
import useStyles from "./styles";

const LiveCall = ({ name, callAccepted, myVideo, userVideo, callEnded, stream, setStream, call, answerCall, leaveCall }) => {
  var classes = useStyles();
//   const { name, callAccepted, myVideo, userVideo, callEnded, stream, setStream, call, answerCall } = useContext(SocketContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream);

      myVideo.current.srcObject = currentStream;
    });
  }, []);

//   const handleDisagree = () => {
//     setOpen(false);
//   };

//   const handleAgree = () => {
//     setOpen(false);
//     {answerCall()}
//   };

  return (
      <Grid container spacing={1} justify="center" className={classes.callPanel}>


        {stream && (
            <Grid item xs={12} md={6}>
                <Paper className={classes.Paper}>
                    <Typography variant="h5" className={classes.nameOnVideo}>{name || 'Name'}</Typography>
                    <video playsInline muted ref={myVideo} autoPlay className={classes.video} />            
                </Paper>
            </Grid>
        )}
        {callAccepted && !callEnded && (
            <Grid item xs={12} md={6}>
                <Paper className={classes.Paper}>
                    <Typography variant="h5" className={classes.nameOnVideo}>{call.name || 'Name'}</Typography>
                    <video playsInline ref={userVideo} autoPlay className={classes.video} />        
                </Paper>
            </Grid>  
        )}
        {call.isReceivingCall && !callAccepted && (
            <Grid item xs={12} md={6}>
            <Paper className={classes.Paper}>
            {call.name} wants to join
            <Button onClick={answerCall} color="primary" autoFocus>
            Agree
            </Button>
            </Paper>
            </Grid>
        )}
        <Grid item xs={12}>
            <Paper className={classes.Paper} justify="center">
                <IconButton><Mic /></IconButton>
                <IconButton><Videocam /></IconButton>
                {callAccepted && !callEnded && (
                    <IconButton onClick={leaveCall} color="secondary"><CallEnd/></IconButton>
                )}
            </Paper>       
        </Grid>
      </Grid>


      
  );
}

export default LiveCall;