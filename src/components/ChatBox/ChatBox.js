import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  IconButton,
  Icon,
  Divider,
  TextField,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Fab,
  Typography,
  Badge,
  CircularProgress
} from "@material-ui/core";
import { MoreVert as MoreVertIcon, Send as SendIcon } from "@material-ui/icons";

import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

import { useDispatch, useSelector } from "react-redux";
import { fetchChatDetails, sendMessage } from "../../redux/actions/ChatActions";
import UserContext from "../../context/AuthContext";
import { socket } from "../../context/AuthContext";


// styles
import useStyles from "./styles";

const ChatBox = () => {
  var classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const { SelectedContact } = useSelector((state) => state.contacts);
  const { ChatContent } = useSelector((state) => state.chats);
  const [isLoading, setIsLoading] = useState(null);

  const [message, setMessage] = useState("");
  const chatBottomRef = document.querySelector("#chat-scroll");


  useEffect(() => {
    setIsLoading(true);
    {
      SelectedContact[0] &&
        dispatch(fetchChatDetails(SelectedContact[0].chatId))
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [SelectedContact[0]]);
  

  const sendMessageOnEnter = (event) => {
      console.log( event.type)
      if(event.key === "Enter" || event.type === "click" && !event.shiftKey){
                dispatch(sendMessage(SelectedContact[0].chatId, `${user.firstName} ${user.lastName}`, message.trim()))
                socket.emit("messageSent")
          setMessage("");
      }
  };

  console.log(SelectedContact)
  socket.on("updateChat", () => {
      console.log("here")
    dispatch(fetchChatDetails(SelectedContact[0].chatId))
});

  const scrollToBottom = useCallback(() => {
    if (chatBottomRef) {
      chatBottomRef.scrollTo({
        top: chatBottomRef.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatBottomRef]);

  useEffect(() => {
    scrollToBottom();
  }, [ChatContent, scrollToBottom]);

  return (
      <Card className={classes.cardBody} fullWidth>
      <CardHeader
        avatar={
          <Avatar src={SelectedContact[0] && SelectedContact[0].avatar}>
            OU
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={SelectedContact[0] && SelectedContact[0].userName}
        className={classes.header}
      />
      <Divider />
      <CardContent className={classes.chatBoxContent}>
        <PerfectScrollbar id="chat-scroll">
          {!SelectedContact[0] && (
            <Typography>Select a contact to start chatting </Typography>
          )}
          {SelectedContact[0] && isLoading && <CircularProgress size={60} />}
          {SelectedContact[0] && !isLoading && !ChatContent[0] && (
            <Typography>
              start chatting with {SelectedContact[0].userName}
            </Typography>
          )}
          {SelectedContact[0] &&
            !isLoading &&
            ChatContent[0] &&
            ChatContent.map((item) => (
              <div
                className={
                  user.id == item.userId
                    ? classes.myMessage
                    : classes.theirMessage
                }
              >
                <div>
                  <Typography variant="subtitle2">{item.userName}</Typography>
                  <Card
                    className={
                      user.id == item.userId
                        ? classes.myMessageCard
                        : classes.theirMessageCard
                    }
                  >
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
          <Fab color="primary" aria-label="send" onClick={sendMessageOnEnter}>
            <SendIcon />
          </Fab>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
