import axios from 'axios'

const API_URL = "http://localhost:5000";

export const fetchChatDetails = (chatId) => async (dispatch) => {
    const res = await axios.get(API_URL + `/api/chat/${chatId}`)
        dispatch({
            type: 'FETCH_CHAT',
            payload: res.data
        })
    return Promise.resolve();
}

export const sendMessage = (chatId, myName, text) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/chat/${chatId}`, {
        myName,
        text
    })
        dispatch({
            type: 'SEND_MESSAGE',
            payload: res.data
        })
    return Promise.resolve();
}