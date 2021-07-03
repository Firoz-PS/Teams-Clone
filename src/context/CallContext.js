import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const API_URL = "http://localhost:5000";

const initialState = {
    callId: null,
    connectionId: null,
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'START_CALL': {
            const { callId } = action.payload
            return {
                ...state,
                callId,
            }
        }
        case 'JOIN_CALL': {
            const { connectionId } = action.payload
            return {
                ...state,
                connectionId,
            }
        }
        case 'LEAVE_CALL': {
            return {
                ...state,
                callId: null,
                connectionId: null,
            }
        }
        case 'END_CALL': {
            return {
                ...state,
                callId: null,
                connectionId: null,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const CallContext = createContext({
    ...initialState,
    startCall: () => {},
    joinCall: () => {},
    leaveCall: () => {},
    endCall: () => {},
})

export const CallProvider = ({ children }) => {
const [state, dispatch] = useReducer(userReducer, initialState)

const startCall = async (name, connectionId, history) => {
    const res = await axios.post(API_URL + '/api/call/start', {
        name,
        connectionId,
    })
    const { callId } = res.data
    dispatch({
        type: 'START_CALL',
        payload: {
            callId,
        },
    })
    history.push(`/app/call/${callId}`)
}

const joinCall = async (callId, history) => {
    const res = await axios.post(API_URL + `/api/user/leaveCall/${callId}`)
    const { connectionId } = res
    dispatch({
        type: 'JOIN_CALL',
        payload: {
            connectionId,
        },
    })
    history.push(`/app/call/${callId}`)
}

const leaveCall = async (callId, history) => {
    const res = await axios.post(API_URL + `/api/user/leaveCall/${callId}`)
    dispatch({
        type: 'LEAVE_CALL'
    })
    history.push('/app/call')
}

const endCall = async (callId, history) => {
    const res = await axios.post(API_URL + `/api/user/endCall/${callId}`)
    dispatch({
        type: 'END_CALL'
    })
    history.push('/app/call')
}

return (
    <CallContext.Provider
        value={{
            ...state,
            startCall,
            joinCall,
            leaveCall,
            endCall,
        }}
    >
        {children}
    </CallContext.Provider>
)
}
export default CallContext
// export {UserProvider, UserContext};
