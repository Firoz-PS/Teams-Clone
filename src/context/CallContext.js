// import React, { createContext, useEffect, useReducer, useState, useRef } from 'react'
// import jwtDecode from 'jwt-decode'
// import axios from 'axios'
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';

// const API_URL = "http://localhost:5000";

// const socket = io('http://localhost:5000');
// // const socket = io('https://warm-wildwood-81069.herokuapp.com');

// const initialState = {
//     myName: null,
//     callId: null,
//     mySocketId: null,
//     myStream: null,
//     call: {},
//     callAccepted: false,
//     callEnded: false
// }

// const callReducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_SOCKET_ID': {
//             const { mySocketId } = action.payload
//             return {
//                 ...state,
//                 mySocketId
//             }
//         }
//         case 'ADD_MY_STREAM': {
//             const { myStream } = action.payload
//             return {
//                 ...state,
//                 myStream
//             }
//         }
//         case 'INCOMING_CALL': {
//             const { call } = action.payload
//             return {
//                 ...state,
//                 call
//             }
//         }
//         case 'START_CALL': {
//             const { callId, myName } = action.payload
//             return {
//                 ...state,
//                 callId,
//                 myName,
//                 //myStream
//             }
//         }
//         case 'JOIN_CALL': {
//             const { callId, myName } = action.payload
//             return {
//                 ...state,
//                 callId,
//                 myName,
//                 //myStream
//             }
//         }
//         case 'ANSWER_CALL': {
//             const { callAccepted } = action.payload
//             return {
//                 ...state,
//                 callAccepted
//             }
//         }
//         case 'CALL_ACCEPTED': {
//             const { call, callAccepted } = action.payload
//             return {
//                 ...state,
//                 call,
//                 callAccepted
//             }
//         }
//         case 'LEAVE_CALL': {
//             return {
//                 ...state,
//                 callId: null,
//                 mySocketId: null,
//             }
//         }
//         case 'END_CALL': {
//             return {
//                 ...state,
//                 callId: null,
//                 mySocketId: null,
//             }
//         }
//         default: {
//             return { ...state }
//         }
//     }
// }

// const CallContext = createContext({
//     ...initialState,
//     // myVideo,
//     // userVideo,
//     // connectionRef,
//     startCall: () => {},
//     joinCall: () => {},
//     answerCall: () => {},
//     leaveCall: () => {},
//     endCall: () => {},
//     addMyStream: () => {}
// })

// export const CallProvider = ({ children }) => {
// const [state, dispatch] = useReducer(callReducer, initialState)
// const [mySocketId, setMySocketId] = useState(null)
// // const [myStream, setMyStream] = useState(null)
// const [call, setCall] = useState({})

// //const myVideo = useRef();
// const userVideo = useRef();
// const connectionRef = useRef();

// /***********************************************************************************************/  
//     useEffect(() => {
//         socket.on('mySocketId', (mySocketId) => {
//             setMySocketId(mySocketId)});
//             dispatch({
//                 type: 'SET_SOCKET_ID',
//                 payload: {
//                     mySocketId
//                 },
//             })

//         socket.on('callUser', ({ signal, from, name, fromUserId }) => {
//             setCall({ isReceivingCall: true, signal, from, name, fromUserId });
//             console.log("here")
//             dispatch({
//                 type: 'INCOMING_CALL',
//                 payload: {
//                     call
//                 },
//             })
//           });
//     }, []);

//   const addMyStream = (myStream) => {
//     dispatch({
//         type: 'ADD_MY_STREAM',
//         payload: {
//             myStream
//         },
//     })
//     console.log(state)

//   }  

//   const SendRequestToJoin = (hostSocketId, userId) => {
//       console.log(state)
//     const peer = new Peer({ initiator: true, trickle: false, stream: state.myStream });

//     peer.on('signal', (data) => {
//       socket.emit('callUser', { userToCall: hostSocketId, signalData: data, from: state.mySocketId, name: state.myName, fromUserId : userId});
//     });

//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });

//     socket.on('callAccepted', ({signal, hostName}) => {
//         setCall({ signal, hostName});
//         dispatch({
//             type: 'CALL_ACCEPTED',
//             payload: {
//                 call,
//                 callAccepted: true
//             },
//         })

//       peer.signal(call.signal);
//     });

//     connectionRef.current = peer;
//   };

//   const acceptJoinRequest = (myName) => {

//     const peer = new Peer({ initiator: false, trickle: false, stream: state.myStream });

//     peer.on('signal', (data) => {
//       socket.emit('answerCall', { signal: data, to: call.from , name: myName});
//     });

//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });

//     peer.signal(call.signal);

//     connectionRef.current = peer;
//   };  

// /***********************************************************************************************/  

// const startCall = async (firstName, lastName, callName, history) => {
//     const res = await axios.post(API_URL + '/api/call/start', {
//         callName,
//         mySocketId,
//     })
//     const { callId } = res.data
//     const myName = `${firstName} ${lastName}`
//     // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     // .then((currentStream) => {
//     //   setMyStream(currentStream);
//     // });
//     dispatch({
//         type: 'START_CALL',
//         payload: {
//             callId,
//             myName,
//             //myStream
//         },
//     })
//     history.push(`/app/call/${callId}`)
//     // console.log(myVideo)
//     // myVideo.current.srcObject = myStream;
// }

// const joinCall = async (firstName, lastName, callId, history, userId) => {
//     history.push(`/app/call/${callId}`)
//     const res = await axios.get(API_URL + `/api/call/join/${callId}`)
//     const { hostSocketId } = res.data
//     const myName = `${firstName} ${lastName}`
//     // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     // .then((currentStream) => {
//     //   setMyStream(currentStream);

//     //   myVideo.current.srcObject = currentStream;
//     // });
//     dispatch({
//         type: 'JOIN_CALL',
//         payload: {
//             callId,
//             myName,
//            // myStream
//         },
//     })
//         SendRequestToJoin(hostSocketId, userId)
// }

// const answerCall = async (callId, userId, userSocketId, myName) => {
//     const res = await axios.put(API_URL + `/api/call/answer/${callId}`,{
//         userId,
//         userSocketId
//     })
//     acceptJoinRequest(myName)
//     dispatch({
//         type: 'ANSWER_CALL',
//         payload: {
//             callAccepted : true
//         },
//     })
// }

// const leaveCall = async (callId, history) => {
//     const res = await axios.put(API_URL + `/api/call/leave/${callId}`)
//     dispatch({
//         type: 'LEAVE_CALL'
//     })
//     history.push('/app/call')
// }

// const endCall = async (callId, history) => {
//     const res = await axios.put(API_URL + `/api/user/end/${callId}`)
//     dispatch({
//         type: 'END_CALL'
//     })
//     history.push('/app/call')
// }

// return (
//     <CallContext.Provider
//         value={{
//             ...state,
//             //myVideo,
//             userVideo,
//             connectionRef,
//             startCall,
//             joinCall,
//             answerCall,
//             leaveCall,
//             endCall,
//             addMyStream
//         }}
//     >
//         {children}
//     </CallContext.Provider>
// )
// }
// export default CallContext
// // export {UserProvider, UserContext};
