import axios from 'axios'

const API_URL = "http://localhost:5000";

export const selectContact = (id) => async (dispatch, getState) => {
    let { contacts } = getState()
    const selectedContact = await contacts.Contacts.filter((contact) => {
        if(contact._id === id){
            return contact
        }
    })
        dispatch({
            type: 'SELECT_CONTACT',
            payload: selectedContact
        })
    return Promise.resolve();
}

export const fetchContactInfo = (contactInfosId) => async (dispatch) => {
    const res = await axios.get(API_URL + `/api/contacts/${contactInfosId}`)
        dispatch({
            type: 'FETCH_CONTACT',
            payload: res.data
        })
    return Promise.resolve();
}

export const addContact = (contactId, userId, userName, avatar, myName, myAvatar) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/addContact/${contactId}`, {
        userId,
        userName,
        avatar,
        myName,
        myAvatar
    })
        dispatch({
            type: 'ADD_CONTACT',
            payload: res.data
        })
    return Promise.resolve();
}

export const addInviteSent = (contactId, userId, userName, avatar) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/addInviteSent/${contactId}`, {
        userId,
        userName,
        avatar
    })
        dispatch({
            type: 'ADD_INVITE_SENT',
            payload: res.data
        })
    return Promise.resolve();
}

export const addInviteReceived = (contactId, userId, userName, avatar) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/addInviteReceived/${contactId}`, {
        userId,
        userName,
        avatar
    })
        dispatch({
            type: 'ADD_INVITE_RECEIVED',
            payload: res.data
        })
    return Promise.resolve();
}

export const removeContact = (contactId, contactUserId) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/removeContact/${contactId}`, {
        contactUserId
    })
        dispatch({
            type: 'REMOVE_CONTACT',
            payload: res.data
        })
    return Promise.resolve();
}

export const removeInviteSent = (contactId, contactUserId) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/removeInviteSent/${contactId}`, {
        contactUserId
    })
        dispatch({
            type: 'REMOVE_INVITE_SENT',
            payload: res.data
        })
    return Promise.resolve();
}

export const removeInviteReceived = (contactId, contactUserId) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/contacts/removeInviteReceived/${contactId}`, {
        contactUserId
    })
        dispatch({
            type: 'REMOVE_INVITE_RECEIVED',
            payload: res.data
        })
    return Promise.resolve();
}