import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const API_URL = "http://localhost:5000";

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    console.log(decodedToken)
    return decodedToken.exp > currentTime
}

const setToken = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers = {"x-access-token" : `${accessToken}`}
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers
    }
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'USER_INIT': {
            const { isAuthenticated, user } = action.payload
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'USER_SIGN_IN': {
            const { user } = action.payload
            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'USER_SIGN_UP': {
            const { user } = action.payload
            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'USER_SIGN_OUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'UPDATE_AVATAR': {
            return {
                ...state,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const UserContext = createContext({
    ...initialState,
    userSignIn: () => {},
    userSignOut: () => {},
    userSignUp: () => {},
    updateAvatar: () => {},
})

export const UserProvider = ({ children }) => {
const [state, dispatch] = useReducer(userReducer, initialState)

useEffect(() => {
    (async () => {
        try {
            const accessToken = window.localStorage.getItem('accessToken')
            if (accessToken && isValidToken(accessToken)) {
                setToken(accessToken)
                const res = await axios.get(API_URL + '/api/user/profile')
                const {user} = res.data
                dispatch({
                    type: 'USER_INIT',
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                })
            } else {
                dispatch({
                    type: 'USER_INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'USER_INIT',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            })
        }
    })()
}, [])

const userSignIn = async (email, password, history, setIsLoading, setError) => {
    setError(false);
    setIsLoading(true);
    const res = await axios.post(API_URL + '/api/user/signin', {
        email,
        password,
    })
    const { accessToken, user } = res.data
    setToken(accessToken)
    setError(false)
    setIsLoading(false)
    dispatch({
        type: 'USER_SIGN_IN',
        payload: {
            user,
        },
    })
    history.push('/app/call')
}

const userSignUp = async (firstName, lastName, email, password, history, setIsLoading, setError) => {
    setError(false);
    setIsLoading(true);
    const res = await axios.post(API_URL + '/api/user/signup', {
        firstName,
        lastName,
        email,
        password,
    })
    const { accessToken, user } = res
    setToken(accessToken)
    setError(false)
    setIsLoading(false)
    dispatch({
        type: 'USER_SIGN_UP',
        payload: {
            user,
        },
    })
    history.push('/app/call')
}

const userSignOut = async (history) => {
    const res = await axios.put(API_URL + '/api/user/signout')
    setToken(null)
    dispatch({ 
        type: 'USER_SIGN_OUT',
    })
    history.push('/login')
}

const updateAvatar = async (formData) => {
    const res = await axios.post(API_URL + '/api/user/update-avatar', formData)
    dispatch({ 
        type: 'UPDATE_AVATAR',
    })
}

if (!state.isInitialised) {
    console.log("Session expired! you need to signin again")
}

return (
    <UserContext.Provider
        value={{
            ...state,
            userSignIn,
            userSignOut,
            userSignUp,
            updateAvatar,
        }}
    >
        {children}
    </UserContext.Provider>
)
}
export default UserContext
// export {UserProvider, UserContext};
