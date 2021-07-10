import React, { useEffect, useState, useContext } from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Card,
  AppBar,
  Typography,
  Fab,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  ListItemSecondaryAction,
  Button
} from "@material-ui/core";
import { 
    PersonAdd as PersonAddIcon,
    Cancel as CancelIcon,
    Search as SearchIcon,
    Add as AddIcon 
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactInfo,
  addContact,
  addInviteSent,
} from "../../redux/actions/ContactActions";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import UserContext from "../../context/AuthContext";

// styles
import useStyles from "./styles";

// const contacts = [
//     {
//         id: '323sa680b3249760ea21rt47',
//         name: 'Frank Powell',
//         avatar: '/assets/faces/13.jpg',
//         status: 'online',
//         mood: '',
//     },
//     {
//         id: '14663a3406eb47ffa63d4fec9429cb71',
//         name: 'Betty Diaz',
//         avatar: '/assets/faces/12.jpg',
//         status: 'online',
//         mood: '',
//     },
//     {
//         id: '43bd9bc59d164b5aea498e3ae1c24c3c',
//         name: 'Brian Stephens',
//         avatar: '/assets/faces/3.jpg',
//         status: 'online',
//         mood: '',
//     },
//     {
//         id: '3fc8e01f3ce649d1caf884fbf4f698e4',
//         name: 'Jacqueline Day',
//         avatar: '/assets/faces/16.jpg',
//         status: 'offline',
//         mood: '',
//     },
//     {
//         id: 'e929b1d790ab49968ed8e34648553df4',
//         name: 'Arthur Mendoza',
//         avatar: '/assets/faces/10.jpg',
//         status: 'online',
//         mood: '',
//     },
//     {
//         id: 'd6caf04bba614632b5fecf91aebf4564',
//         name: 'Jeremy Lee',
//         avatar: '/assets/faces/9.jpg',
//         status: 'offline',
//         mood: '',
//     },
//     {
//         id: 'be0fb188c8e242f097fafa24632107e4',
//         name: 'Johnny Newman',
//         avatar: '/assets/faces/5.jpg',
//         status: 'offline',
//         mood: '',
//     },
//     {
//         id: 'dea902191b964a68ba5f2d93cff37e13',
//         name: 'Jeffrey Little',
//         avatar: '/assets/faces/15.jpg',
//         status: 'online',
//         mood: '',
//     },
//     {
//         id: '0bf58f5ccc4543a9f8747350b7bda3c7',
//         name: 'Barbara Romero',
//         avatar: '/assets/faces/4.jpg',
//         status: 'offline',
//         mood: '',
//     },
//     {
//         id: 'c5d7498bbcb84d81fc72168871ac6a6e',
//         name: 'Daniel James',
//         avatar: '/assets/faces/2.jpg',
//         status: 'offline',
//         mood: '',
//     },
//     {
//         id: '97bfbdd9413e46efdaca2010400fe18c',
//         name: 'Alice Sanders',
//         avatar: '/assets/faces/17.jpg',
//         status: 'offline',
//         mood: '',
//     },
//     {
//         id: 'dea902191b964a68ba5f2d93cff37e13',
//         name: 'Jeffrey Little',
//         avatar: '/assets/faces/15.jpg',
//         status: 'online',
//         mood: '',
//     },
//     {
//         id: '0bf58f5ccc4543a9f8747350b7bda3c7',
//         name: 'Barbara Romero',
//         avatar: '/assets/faces/4.jpg',
//         status: 'offline',
//         mood: '',
//     },
//     {
//         id: 'c5d7498bbcb84d81fc72168871ac6a6e',
//         name: 'Daniel James',
//         avatar: '/assets/faces/2.jpg',
//         status: 'offline',
//         mood: '',
//     },
//     {
//         id: '97bfbdd9413e46efdaca2010400fe18c',
//         name: 'Alice Sanders',
//         avatar: '/assets/faces/17.jpg',
//         status: 'offline',
//         mood: '',
//     },
// ]

const ViewContacts = () => {
  var classes = useStyles();
  const dispatch = useDispatch();
  const { user, searchUser, searchResult } = useContext(UserContext);
  const { Contacts } = useSelector((state) => state.contacts);
  const [isLoading, setIsLoading] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchContactInfo(user.contactInfosId)).then(() => {
      setIsLoading(false);
    });
  }, []);

  const viewDetails = () => {
    console.log("viewDetails");
  };

  const handleSearch = (event) => {
    if(event.key === "Enter" || event.type === "click" && !event.shiftKey){
        setIsLoading(true);
        console.log("here", searchValue)
        searchUser(searchValue, user.contactInfosId)
        .then(() =>{
          setIsLoading(false)
        }
        )
      }
  };

  const handlefindContact = (e) => {
    setIsSearching(true)
};

const handleAddInviteSent = (e) => {
};

const handleCancelSearch = (e) => {
    setIsSearching(false)
};

  return (
    <>
      <Card>
        <CardHeader 
        title={!isSearching && "Contacts"} 
        action={isSearching &&
            <div>
            <TextField 
            id="standard-basic" 
            label="Standard"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={handleSearch}
            />
            <CancelIcon onClick={handleCancelSearch} />
            <SearchIcon onClick={handleSearch} />
            </div>
        } />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <List>
              {isLoading && <CircularProgress size={60} />}
              {!isLoading &&
                !isSearching &&
                Contacts[0] &&
                Contacts.map((contact) => (
                  <ListItem button key={contact.id} onClick={viewDetails}>
                    <ListItemAvatar>
                      <Avatar src={contact.avatar}></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={contact.userName} />
                  </ListItem>
                ))}
                {!isLoading &&
                  isSearching &&
                  searchResult[0] &&
                  searchResult.map((item) => (
                    <ListItem button key={item._id} onClick={viewDetails}>
                      <ListItemAvatar>
                        <Avatar src={item.avatar}></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.userName} />
                      {!item.isUserAContact &&                      
                        <ListItemSecondaryAction>
                        <Button
                        variant="contained"
                        color="primary"
                        edge="end"
                        size="small"
                        className={classes.button}
                        startIcon={<AddIcon />}
                        onClick={() => {
                          dispatch(addInviteSent(
                            user.contactInfosId,
                            item.userId,
                            item.userName,
                            item.avatar
                            ))
                        }                         
                        }
                      >
                        ADD
                      </Button>
                      </ListItemSecondaryAction>}
                    </ListItem>
                  ))}
            </List>
          </PerfectScrollbar>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.newChatButton}
            onClick={handlefindContact}
          >
            <PersonAddIcon />
          </Fab>
        </CardContent>
      </Card>
    </>
  );
};

export default ViewContacts;
