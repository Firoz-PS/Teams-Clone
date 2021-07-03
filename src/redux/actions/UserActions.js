import axios from 'axios'

export const USER_SIGN_IN = 'USER_SIGN_IN'
export const USER_SIGN_UP = 'USER_SIGN_UP'
export const USER_SIGN_UP = 'USER_SIGN_UP'
export const GET_USER_DETAILS = 'GET_USER_DETAILS'
export const UPDATE_USER_THEME = 'UPDATE_USER_THEME'
export const UPDATE_USER_BASIC = 'UPDATE_USER_BASIC'
export const UPDATE_USER_CONTACT = 'UPDATE_USER_CONTACT'
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD'
export const DELETE_USER = 'DELETE_USER'
export const UPDATE_CART_AMOUNT = 'UPDATE_CART_AMOUNT'


export const userSignIn = () => (dispatch) => {
    axios.put('/api/user/signin').then((res) => {
        dispatch({
            type: USER_SIGN_IN,
            payload: res.data,
        })
    })
}

export const userSignUp = (firstName , lastName, email, password) => (dispatch) => {
    axios.post('/api/user/signup', {firstName , lastName, email, password}).then((res) => {
        dispatch({
            type: USER_SIGN_UP,
            payload: res.data,
        })
    })
}

export const userSignOut = (userId) => (dispatch) => {
    axios.put(`/api/user/signout/${userId}`).then((res) => {
        dispatch({
            type: USER_SIGN_OUT,
            payload: res.data,
        })
    })
}

export const getUserDetails = (userId) => (dispatch) => {
    axios.get(`/api/user/${userId}`).then((res) => {
        dispatch({
            type: GET_USER_DETAILS,
            payload: res.data,
        })
    })
}

export const updateUserTheme = (userId, color, theme) => (dispatch) => {
    axios.put(`/api/user/THEME/${userId}`, {color, theme}).then((res) => {
        dispatch({
            type: UPDATE_USER_THEME,
            payload: res.data,
        })
    })
}

export const updateUserBasicDetails = (userId, firstName, lastName, phoneNo, avatar ) => (dispatch) => {
    axios.put(`/api/user/BASIC/${userId}`, {firstName, lastName, phoneNo, avatar}).then((res) => {
        dispatch({
            type: UPDATE_USER_BASIC,
            payload: res.data,
        })
    })
}

export const updateUserContact = (userId, contactId, chatId, contactName, contactAvatar, isContactOnline, lastChatTime) => (dispatch) => {
    axios.put(`/api/user/CONTACT/${userId}`, {contactId, chatId, contactName, contactAvatar, isContactOnline, lastChatTime}).then((res) => {
        dispatch({
            type: UPDATE_USER_CONTACT,
            payload: res.data,
        })
    })
}

export const updateUserPassword = (userId, oldPassword, newPassword) => (dispatch) => {
    axios.put(`/api/user/PASSWORD/${userId}`, {oldPassword, newPassword}).then((res) => {
        dispatch({
            type: UPDATE_USER_PASSWORD,
            payload: res.data,
        })
    })
}

export const deleteUser = (userId) => (dispatch) => {
    axios.put('/api/user/delete', {userId}).then((res) => {
        console.log(res.data)
        dispatch({
            type: DELETE_USER,
            payload: res.data,
        })
    })
}

