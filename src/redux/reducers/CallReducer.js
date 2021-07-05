import {
    SET_SOCKET_ID,
    ADD_MY_STREAM,
    INCOMING_CALL,
    START_CALL,
    JOIN_CALL,
    ANSWER_CALL,
    CALL_ACCEPTED,
    LEAVE_CALL,
    END_CALL
} from '../actions/CallActions'

const initialState = {
    CallList: [],
}

const callReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SOCKET_ID': {
            state.CallList.push(action.payload.call)
            return {
                ...state,
            }
        }
        case 'ADD_MY_STREAM': {
            const { myStream } = action.payload
            return {
                ...state,
                myStream
            }
        }
        case 'INCOMING_CALL': {
            const { call } = action.payload
            return {
                ...state,
                call
            }
        }
        case 'START_CALL': {
            state.CallList.push(action.payload.call)
            return {
                ...state,
            }
        }
        case 'JOIN_CALL': {
            state.CallList.push(action.payload.call)
            return {
                ...state,
            }
        }
        case 'ANSWER_CALL': {
            const { callAccepted } = action.payload
            return {
                ...state,
                callAccepted
            }
        }
        case 'CALL_ACCEPTED': {
            const { call, callAccepted } = action.payload
            return {
                ...state,
                call,
                callAccepted
            }
        }
        case 'LEAVE_CALL': {
            return {
                ...state,
                callId: null,
                mySocketId: null,
            }
        }
        case 'END_CALL': {
            return {
                ...state,
                callId: null,
                mySocketId: null,
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default callReducer