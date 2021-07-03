// import React, { createContext, useEffect, useReducer, useContext } from "react";
// import axios from "axios";

// var UserStateContext = React.createContext();
// var UserDispatchContext = React.createContext();
// const API_URL = "http://localhost:5000/api/auth/";

// const userReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_SUCCESS": {
//       return { 
//         ...state, 
//         isAuthenticated: true 
//       };
//     }
//     case "SIGN_OUT_SUCCESS": {
//       return { 
//         ...state, 
//         isAuthenticated: false 
//       };
//     }
//     case "SIGN_UP_SUCCESS": {
//       return { 
//         ...state      
//       };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

// const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(userReducer, {
//     isAuthenticated: !!localStorage.getItem("user_id"),
//   });

//   return (
//     <UserStateContext.Provider value={state}>
//       <UserDispatchContext.Provider value={dispatch}>
//         {children}
//       </UserDispatchContext.Provider>
//     </UserStateContext.Provider>
//   );
// }

// const useUserState = () => {
//   var context = useContext(UserStateContext);
//   if (context === undefined) {
//     throw new Error("useUserState must be used within a UserProvider");
//   }
//   return context;
// }

// const useUserDispatch = () => {
//   var context = useContext(UserDispatchContext);
//   if (context === undefined) {
//     throw new Error("useUserDispatch must be used within a UserProvider");
//   }
//   return context;
// }

// export { UserProvider, useUserState, useUserDispatch, loginUser, signupUser, signOut };

// // ###########################################################

// const loginUser = (dispatch, email, password, history, setIsLoading, setError) => {
//   setError(false);
//   setIsLoading(true);

//   if (!!email && !!password) {
//     return axios
//     .post(API_URL + "signin", {
//       email,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user_id", JSON.stringify(response.data.accessToken));
//         setError(null)
//         setIsLoading(false)
//         dispatch({ type: 'LOGIN_SUCCESS' })
//         history.push('/app/call')
//       }
//     });
//   } 
//   else {
//     dispatch({ type: "LOGIN_FAILURE" });
//     setError(true);
//     setIsLoading(false);
//   }
// }

// const signupUser = (dispatch, username, email, password, history, setIsLoading, setError) => {
//   setError(false);
//   setIsLoading(true);

//   if (!!username && !!email && !!password) {
//     return axios
//     .post(API_URL + "signup", {
//       username,
//       email,
//       password,
//     })
//     .then((response) => {
//       if (response.data.message == "User was registered successfully!") {
//         setError(null)
//         setIsLoading(false)
//         dispatch({ type: 'SIGN_UP_SUCCESS' })
//         loginUser(dispatch, email, password, history, setIsLoading, setError)
//       }
//     });
//   } 
//   else {
//     dispatch({ type: "SIGN_UP_FAILURE" });
//     setError(true);
//     setIsLoading(false);
//   }
// }

// const signOut = (dispatch, history) => {
//   localStorage.removeItem("user_id");
//   dispatch({ type: "SIGN_OUT_SUCCESS" });
//   history.push("/login");
//   window.location.reload();
// }
