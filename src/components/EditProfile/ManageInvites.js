import React, {useState} from 'react';
import {List, ListItem , ListItemAvatar, ListItemText, Avatar, Badge, Card, AppBar, Typography, Fab, CardContent, CardHeader, Divider, Tabs, Tab} from '@material-ui/core';

import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

// styles
import useStyles from "./styles";

const invitesReceived = [
    {
        id: 'be0fb188c8e242f097fafa24632107e4',
        name: 'Johnny Newman',
        avatar: '/assets/faces/5.jpg',
        status: 'offline',
        mood: '',
    },
    {
        id: 'dea902191b964a68ba5f2d93cff37e13',
        name: 'Jeffrey Little',
        avatar: '/assets/faces/15.jpg',
        status: 'online',
        mood: '',
    },
    {
        id: '0bf58f5ccc4543a9f8747350b7bda3c7',
        name: 'Barbara Romero',
        avatar: '/assets/faces/4.jpg',
        status: 'offline',
        mood: '',
    },
    {
        id: 'c5d7498bbcb84d81fc72168871ac6a6e',
        name: 'Daniel James',
        avatar: '/assets/faces/2.jpg',
        status: 'offline',
        mood: '',
    },
    {
        id: '97bfbdd9413e46efdaca2010400fe18c',
        name: 'Alice Sanders',
        avatar: '/assets/faces/17.jpg',
        status: 'offline',
        mood: '',
    },
    {
        id: 'dea902191b964a68ba5f2d93cff37e13',
        name: 'Jeffrey Little',
        avatar: '/assets/faces/15.jpg',
        status: 'online',
        mood: '',
    },
    {
        id: '0bf58f5ccc4543a9f8747350b7bda3c7',
        name: 'Barbara Romero',
        avatar: '/assets/faces/4.jpg',
        status: 'offline',
        mood: '',
    },
    {
        id: 'c5d7498bbcb84d81fc72168871ac6a6e',
        name: 'Daniel James',
        avatar: '/assets/faces/2.jpg',
        status: 'offline',
        mood: '',
    },
    {
        id: '97bfbdd9413e46efdaca2010400fe18c',
        name: 'Alice Sanders',
        avatar: '/assets/faces/17.jpg',
        status: 'offline',
        mood: '',
    },
]

const invitesSent = [
    {
        id: '323sa680b3249760ea21rt47',
        name: 'Frank Powell',
        avatar: '/assets/faces/13.jpg',
        status: 'online',
        mood: '',
    },
    {
        id: '14663a3406eb47ffa63d4fec9429cb71',
        name: 'Betty Diaz',
        avatar: '/assets/faces/12.jpg',
        status: 'online',
        mood: '',
    },
    {
        id: '43bd9bc59d164b5aea498e3ae1c24c3c',
        name: 'Brian Stephens',
        avatar: '/assets/faces/3.jpg',
        status: 'online',
        mood: '',
    },
    {
        id: '3fc8e01f3ce649d1caf884fbf4f698e4',
        name: 'Jacqueline Day',
        avatar: '/assets/faces/16.jpg',
        status: 'offline',
        mood: '',
    },
]


const ManageInvites = () => {
    var classes = useStyles()
    const [activeTabId, setActiveTabId] = useState(0);


    return (
        <Card >
        <CardHeader
        title="Invites"
        />
        <Divider />
        <CardContent className={classes.content}>
        <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Received" classes={{ root: classes.tab }} />
            <Tab label="Sent" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <PerfectScrollbar>
            <List>
            {invitesReceived.map((item) => (
                <ListItem button key={item.id}>
                <ListItemAvatar>
                    <Avatar src={item.avatar}>
                    {item.mood}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem />  
            </List>             
            </PerfectScrollbar>
          )}
          {activeTabId === 1 && (
            <PerfectScrollbar>
            <List>
            {invitesSent.map((item) => (
                <ListItem button key={item.id}>
                <ListItemAvatar>
                    <Avatar src={item.avatar}>
                    {item.mood}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem />  
            </List>             
            </PerfectScrollbar>
          )} 
        </CardContent>
        </Card>
    )
}

export default ManageInvites;