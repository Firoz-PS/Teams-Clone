const initialState = {
    Contacts: [],
    InvitesSent: [],
    InvitesReceived: [],
    SelectedContact: [],
    ContactToView: []
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CONTACT': {
            state.Contacts = action.payload.contact.contacts
            state.InvitesSent = action.payload.contact.invitesSent
            state.InvitesReceived = action.payload.contact.invitesReceived
            return {
                ...state,
            }
        }
        case 'SELECT_CONTACT': {
            state.SelectedContact = action.payload
            return {
                ...state,
            }
        }
        case 'VIEW_CONTACT': {
            state.ContactToView = action.payload.user
            return {
                ...state,
            }
        }
        case 'ADD_CONTACT': {
            state.Contacts = action.payload.contacts
            state.InvitesReceived = action.payload.invitesReceived
            console.log(state)
            return {
                ...state,
            }
        }
        case 'ADD_INVITE': {
            state.InvitesSent = action.payload.invitesSent
            console.log(state)
            return {
                ...state,
            }
        }
        // case 'ADD_INVITE_RECEIVED': {
        //     state.CallList.push(action.payload.call)
        //     return {
        //         ...state,
        //     }
        // }
        case 'REMOVE_CONTACT': {
            state.Contacts = action.payload.contacts
            return {
                ...state,
            }
        }
        case 'REMOVE_INVITE_SENT': {
            state.InvitesSent = action.payload.invitesSent
            return {
                ...state,
            }
        }
        case 'REMOVE_INVITE_RECEIVED': {
            state.InvitesReceived = action.payload.invitesReceived
            return {
                ...state,
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default contactReducer