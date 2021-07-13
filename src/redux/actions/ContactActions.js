import axios from 'axios'
import { useSnackbar } from 'notistack';

const API_URL = "http://localhost:5000";



const showSnackbar = () => () => {
    const { enqueueSnackbar } = useSnackbar();
    enqueueSnackbar("message");
  };
export const selectContact = (userId) => async (dispatch, getState) => {
    let { contacts } = getState()
    console.log(contacts)
    const selectedContact = await contacts.Contacts.filter((contact) => {
        if(contact.userId == userId){
            console.log(contact)
            return contact
        }
    })
        dispatch({
            type: 'SELECT_CONTACT',
            payload: selectedContact
        })
    return Promise.resolve();
}

// export const ViewContactDetails = (userId) => async (dispatch) => {
//     const res = await axios.get(API_URL + `/api/user/details/${userId}`)
//         dispatch({
//             type: 'VIEW_CONTACT',
//             payload: res.data
//         })
//     return Promise.resolve();
// }

export const fetchContactInfo = (contactInfosId) => async (dispatch) => {
    const res = await axios.get(API_URL + `/api/contacts/${contactInfosId}`)
        dispatch({
            type: 'FETCH_CONTACT',
            payload: res.data
        })
    return Promise.resolve();
}

export const addContact = (contactId, userId, userName, avatar, myName, myAvatar,type) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/addContact/${contactId}`, {
        userId,
        userName,
        avatar,
        myName,
        myAvatar,
        type
    })
    console.log("payload", res.data)
        dispatch({
            type: 'ADD_CONTACT',
            payload: res.data
        })
    return Promise.resolve();
}

export const addInvite = (contactId, userId, userName, avatar, myName, myAvatar, type) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/addInvite/${contactId}`, {
        userId,
        userName,
        avatar,
        myName,
        myAvatar,
        type
    })
        dispatch({
            type: 'ADD_INVITE',
            payload: res.data
        })
        showSnackbar()
    return Promise.resolve();
}

// export const addInviteReceived = (contactId, userId, userName, avatar) => async (dispatch) => {
//     const res = await axios.put(API_URL + `/api/contacts/addInviteReceived/${contactId}`, {
//         userId,
//         userName,
//         avatar
//     })
//         dispatch({
//             type: 'ADD_INVITE_RECEIVED',
//             payload: res.data
//         })
//     return Promise.resolve();
// }

export const removeContact = (contactId, userId) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/removeContact/${contactId}`, {
        userId
    })
        dispatch({
            type: 'REMOVE_CONTACT',
            payload: res.data
        })
    return Promise.resolve();
}

export const removeInviteSent = (contactId, userId) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/removeInviteSent/${contactId}`, {
        userId
    })
        dispatch({
            type: 'REMOVE_INVITE_SENT',
            payload: res.data
        })
    return Promise.resolve();
}

export const removeInviteReceived = (contactId, userId) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/removeInviteReceived/${contactId}`, {
        userId
    })
        dispatch({
            type: 'REMOVE_INVITE_RECEIVED',
            payload: res.data
        })
    return Promise.resolve();
}