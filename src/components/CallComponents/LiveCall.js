import React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import {
  Grid,
  Paper,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Slide,
} from "@material-ui/core";
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  CallEnd,
  Chat,
  Cancel
} from "@material-ui/icons";
import { socket } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptJoinRequest,
  rejectJoinRequest,
  removeMeFromParticipants,
} from "../../redux/actions/CallActions";
import Peer from "simple-peer";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/AuthContext";

// styles
import useStyles from "./styles";
import { Card } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import ChatBox from "../ChatComponents/ChatBox";

const LiveCall = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { CallList } = useSelector((state) => state.calls);
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [mic, setMic] = useState(false);
  const [video, setVideo] = useState(false);
  const [userName, setUserName] = useState(null);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const muteUnmute = () => {
    setMic(!myVideo.current.srcObject.getAudioTracks()[0].enabled);
    myVideo.current.srcObject.getAudioTracks()[0].enabled = mic;
  };

  const playStop = () => {
    setVideo(!myVideo.current.srcObject.getVideoTracks()[0].enabled);
    myVideo.current.srcObject.getVideoTracks()[0].enabled = video;
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on("callUser", ({ from, myName, signal, myUserId }) => {
      setCall({ isReceivingCall: true, from, myName, signal, myUserId });
    });
    // {
    //   CallList[0].participants[1] &&
    //     callUser(CallList[0].participants[0].userSocketId);
    // }
  }, []);

  useEffect(() => {

    if(CallList[0].participants[1]){
      callUser(CallList[0].participants[0].userSocketId);
    }
  }, [stream])

  const rejectCall = () => {
    setCallRejected(true);

    socket.emit("rejectCall", { to: call.from });
  };
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        myName: `${user.firstName} ${user.lastName}`,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: socket.id,
        myName: `${user.firstName} ${user.lastName}`,
        myUserId: user.id,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", ({ signal, myName }) => {
      setCallAccepted(true);
      setUserName(myName);
      peer.signal(signal);
    });

    socket.on("callRejected", () => {
      setCallAccepted(true);
      dispatch(removeMeFromParticipants(user.id)
      .then(console.log(CallList)));
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    {connectionRef.ref && connectionRef.current.destroy();
    }
    history.push("/app/call/");
  };

  const handleDisagree = () => {
    dispatch(rejectJoinRequest(CallList[0]._id, call.myUserId)).then(() => {
      rejectCall();
      console.log(CallList);
    });
  };

  const handleAgree = () => {
    dispatch(acceptJoinRequest(CallList[0]._id, call.myUserId)).then(() => {
      answerCall();
      console.log(CallList);
    });
  };

  return (
    <>
      <Grid item xs>
        <Grid
          container
          spacing={1}
          justify="center"
          alignItems="stretch"
          className={classes.callPanel}
        >
          {stream && (
            <Grid item xs={12} md={6}>
              <Paper className={classes.Paper}>
                <Typography variant="h5" className={classes.nameOnVideo}>
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  className={classes.video}
                />
              </Paper>
            </Grid>
          )}
          {callAccepted && !callEnded && (
            <Grid item xs={12} md={6}>
              <Paper className={classes.Paper}>
                <Typography variant="h5" className={classes.nameOnVideo}>
                  {call.myName || userName}
                </Typography>
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  className={classes.video}
                />
              </Paper>
            </Grid>
          )}
          {call.isReceivingCall && !callAccepted && !callRejected && (
            <Dialog
              open={true}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleDisagree}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Accept or Reject join request"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {call.myName} wants to join this call. Do you want to accept
                  this request
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDisagree} color="secondary">
                  Reject
                </Button>
                <Button onClick={handleAgree} color="primary">
                  Accept
                </Button>
              </DialogActions>
            </Dialog>
          )}
          <Grid item xs={12}>
            <Paper className={classes.callBottomBar} justify="center">
              <IconButton onClick={muteUnmute}>
                {mic ? <Mic /> : <MicOff />}
              </IconButton>
              <IconButton onClick={playStop}>
                {video ? <Videocam /> : <VideocamOff />}
              </IconButton>
              <IconButton onClick={leaveCall} color="secondary">
                <CallEnd />
              </IconButton>
              <IconButton onClick={toggleDrawerOpen}>
                <Chat />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {drawerOpen && 
        <Grid item xs={3}>
          <ChatBox />
      </Grid>
      }

    </>
  );
};

export default LiveCall;
