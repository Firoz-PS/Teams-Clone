import axios from 'axios'
export const SET_SOCKET_ID = 'SET_SOCKET_ID'
export const ADD_MY_STREAM = 'ADD_MY_STREAM'
export const INCOMING_CALL = 'INCOMING_CALL'
export const START_CALL = 'START_CALL'
export const JOIN_CALL = 'JOIN_CALL'
export const ANSWER_CALL = 'ANSWER_CALL'
export const CALL_ACCEPTED = 'CALL_ACCEPTED'
export const LEAVE_CALL = 'LEAVE_CALL'
export const END_CALL = 'END_CALL'

const API_URL = "http://localhost:5000";

export const startCall = (myName, callName, mySocketId) => async (dispatch) => {
    const res = await axios.post(API_URL + '/api/call/start', {
        callName,
        mySocketId,
        myName,
    })
        dispatch({
            type: 'START_CALL',
            payload: res.data
        })
    return Promise.resolve();
}

export const joinCall = (myName, callId, mySocketId) => async (dispatch) => {
    const res = await axios.put(API_URL + `/api/call/join/${callId}`, {
        myName,
        mySocketId,
    })
        dispatch({
            type: 'JOIN_CALL',
            payload: res.data
        })
    return Promise.resolve();
}

export const answerCall = async (callId, userId, userSocketId, myName) => (dispatch) => {
    axios.put(API_URL + `/api/call/answer/${callId}`,{
        userId,
        userSocketId
    }).then((res) => {
        dispatch({
            type: 'ANSWER_CALL',
            payload: {
                callAccepted : true
            },
        })
    })
    //acceptJoinRequest(myName)
}

export const leaveCall = async (callId) => (dispatch) => {
    axios.put(API_URL + `/api/call/leave/${callId}`)
    dispatch({
        type: 'LEAVE_CALL'
    })
}

export const endCall = async (callId) => (dispatch) => {
    axios.put(API_URL + `/api/user/end/${callId}`)
    dispatch({
        type: 'END_CALL'
    })
}