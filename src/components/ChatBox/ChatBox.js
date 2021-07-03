import React, { useState, useEffect, useCallback } from 'react'
import { IconButton, Icon, Divider, TextField, Avatar, Card, CardHeader, CardContent, Fab, Typography, Badge } from '@material-ui/core'
import {
    MoreVert as MoreVertIcon ,
    Send as SendIcon, 
} from "@material-ui/icons";
// import { getChatRoomByContactId } from "app/views/chat-box/ChatService";

import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

// styles
import useStyles from "./styles";

// for previewing bot message
const globalMessageList = []

const ChatBox = () => {
    var classes = useStyles()

    const [isAlive, setIsAlive] = useState(true)
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const currentUserId = '7863a6802ez0e277a0f98534'
    const chatBottomRef = document.querySelector('#chat-scroll')

    useEffect(() => {
        if (isAlive) {
    setMessageList([
        {
            contactId: '323sa680b3249760ea21rt47',
            text:
                'Do you ever find yourself falling into the “discount trap?”',
            time: '2018-02-10T08:45:28.291Z',
            id: '323sa680b3249760ea21rt47',
            name: 'Frank Powell',
            avatar: '/assets/faces/13.jpg',
            status: 'online',
            mood: '',
        },
        {
            contactId: '7863a6802ez0e277a0f98534',
            text:
                'Giving away your knowledge or product just to gain clients?',
            time: '2018-02-10T08:45:28.291Z',
            id: '7863a6802ez0e277a0f98534',
            name: 'John Doe',
            avatar: '/assets/3.jpg',
            status: 'online',
            mood: '',
        },
        {
            contactId: '323sa680b3249760ea21rt47',
            text: 'Yes',
            time: '2018-02-10T08:45:28.291Z',
            id: '323sa680b3249760ea21rt47',
            name: 'Frank Powell',
            avatar: '/assets/faces/13.jpg',
            status: 'online',
            mood: '',
        },
        {
            contactId: '7863a6802ez0e277a0f98534',
            text: 'Don’t feel bad. It happens to a lot of us',
            time: '2018-02-10T08:45:28.291Z',
            id: '7863a6802ez0e277a0f98534',
            name: 'John Doe',
            avatar: '/assets/3.jpg',
            status: 'online',
            mood: '',
        },
        {
            contactId: '323sa680b3249760ea21rt47',
            text:
                'Do you ever find yourself falling into the “discount trap?”',
            time: '2018-02-10T08:45:28.291Z',
            id: '323sa680b3249760ea21rt47',
            name: 'Frank Powell',
            avatar: '/assets/faces/13.jpg',
            status: 'online',
            mood: '',
        },
        {
            contactId: '7863a6802ez0e277a0f98534',
            text:
                'Giving away your knowledge or product just to gain clients?',
            time: '2018-02-10T08:45:28.291Z',
            id: '7863a6802ez0e277a0f98534',
            name: 'John Doe',
            avatar: '/assets/3.jpg',
            status: 'online',
            mood: '',
        },
        {
            contactId: '323sa680b3249760ea21rt47',
            text: 'Yes',
            time: '2018-02-10T08:45:28.291Z',
            id: '323sa680b3249760ea21rt47',
            name: 'Frank Powell',
            avatar: '/assets/faces/13.jpg',
            status: 'online',
            mood: '',
        },
        {
            contactId: '7863a6802ez0e277a0f98534',
            text: 'Don’t feel bad. It happens to a lot of us',
            time: '2018-02-10T08:45:28.291Z',
            id: '7863a6802ez0e277a0f98534',
            name: 'John Doe',
            avatar: '/assets/3.jpg',
            status: 'online',
            mood: '',
        },
    ])
}
}, [isAlive])


    const sendMessageOnEnter = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            let tempMessage = message.trim()
            if (tempMessage !== '') {
                let tempList = [...messageList]
                let messageObject = {
                    text: tempMessage,
                    contactId: currentUserId,
                }
                tempList.push(messageObject)
                globalMessageList.push(messageObject)
                if (isAlive) setMessageList(tempList)
            }
            setMessage('')
        }
    }

    const scrollToBottom = useCallback(() => {
        if (chatBottomRef) {
            chatBottomRef.scrollTo({
                top: chatBottomRef.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [chatBottomRef])


    useEffect(() => {
        scrollToBottom()
        return () => setIsAlive(false)
    }, [messageList, scrollToBottom])

    return (  
        <Card className={classes.cardBody} fullWidth>
        <CardHeader
        avatar={
            <Avatar aria-label="recipe" >
              OU
            </Avatar>
        }
        action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
        }    
        title="Other User"
        subheader="offline"
        className={classes.header}
        />
        <Divider />
        <CardContent className={classes.content}>
        <PerfectScrollbar id="chat-scroll">
        {messageList.map((item) => (
            <div className={currentUserId == item.contactId ? classes.myMessage : classes.theirMessage}>
                <div className={classes.chatAvatarContainer}>
                <Badge 
                color={item.status == "online" ? "primary" : "secondary"} 
                overlap="circle"
                variant="dot"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                >
                    <Avatar src={item.avatar} />
                </Badge>
                </div>    
                <div>
                <Typography variant="subtitle2">
                {item.name}
                </Typography>
                    <Card className={currentUserId == item.contactId ? classes.myMessageCard : classes.theirMessageCard}>
                        {item.text}
                    </Card>
                    <Typography variant="caption" gutterBottom>
                        1 minute ago
                    </Typography>
                </div>
            </div>
        ))}
        </PerfectScrollbar>
        <div className={classes.input}>
        <TextField
            variant="outlined"
            label="Type here ..."
            multiline
            rowsMax={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={sendMessageOnEnter}
        />
        <Fab color="primary" aria-label="send">
        <SendIcon  />
        </Fab>
        </div>
        </CardContent>  
        </Card>          

    )
}

export default ChatBox;
