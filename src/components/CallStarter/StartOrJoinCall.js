import React from "react";
import { useState, useContext } from "react";
// import { SocketContext } from "../../context/CallContext";
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Input, Button, Card, CardHeader, CardContent, Divider, CardActions, TextField } from "@material-ui/core";

// styles
import useStyles from "./styles";

export default function CallStarter({ me, callAccepted, name, setName, callEnded, leaveCall, callUser }) {
    var classes = useStyles();
    // const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const [callName, setCallName] = useState('New Call');

    const history = useHistory()

    const startCall = () => {
      console.log(me)
      history.push(`/app/call/${me}`);
    }

    const joinCall = () => {     
      callUser(idToCall)
      console.log(idToCall)
      history.push(`/app/call/${idToCall}`);
    }  

    return(
      <Grid container spacing={1} justify="center">
        <Grid item xs={6}>
        <Card>
        <CardHeader
        title="Start Call"
        />
        <Divider />
        <CardContent>
        <TextField
            fullWidth
            label="Enter Call Name"
            name="callName"
            helperText="Enter a Name for the call, by default it will be 'New Call'"
            variant="outlined"
            value={callName} 
            onChange={(e) => setCallName(e.target.value)}
          />
        <Divider />
        <CardActions>
        <Button
          color="primary"
          variant="contained" 
          onClick={() => startCall()}
        >
        Start Call
        </Button>
        </CardActions>  
        </CardContent>
        </Card>
        </Grid>
        <Grid item xs={6}>
        <Card>
        <CardHeader
        title="Join Call"
        />
        <Divider />
        <CardContent>
        <TextField
            fullWidth
            label="Enter Call ID"
            name="callId"
            helperText="Enter a call ID to join a call"
            variant="outlined"
            value={idToCall} 
            onChange={(e) => setIdToCall(e.target.value)}
          />
        <Divider />
        <CardActions>
        <Button 
          color="primary"
          variant="contained"
          onClick={() => joinCall()}
        >
        Join Call
        </Button>
        </CardActions>  
        </CardContent>
        </Card>
        </Grid>
      </Grid>
    )
}

