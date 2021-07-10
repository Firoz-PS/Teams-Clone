import React from 'react';
import { Divider, Grid, Paper, AppBar } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import ChatContacts from '../../components/ChatBox/ChatContacts';
import ChatBox from '../../components/ChatBox/ChatBox';

export default function Chat() {
    var classes = useStyles();

    return (
            <Grid container className={classes.chatPanel}>
            <Grid item xs={3}>
                <ChatContacts />
            </Grid>
            <Grid item xs={9}>
                <ChatBox />
            </Grid>
            </Grid>

            
    )
}