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
        case 'ADD_CONTACT': {
            const { myStream } = action.payload
            return {
                ...state,
                myStream
            }
        }
        case 'ADD_INVITE_SENT': {
            state.InvitesSent = action.payload.invitesSent
            console.log(state)
            return {
                ...state,
            }
        }
        case 'ADD_INVITE_RECEIVED': {
            state.CallList.push(action.payload.call)
            return {
                ...state,
            }
        }
        case 'REMOVE_CONTACT': {
            state.CallList.push(action.payload.call)
            return {
                ...state,
            }
        }
        case 'REMOVE_INVITE_SENT': {
            state.CallList[0].participants.push(action.payload.participant)
            return {
                ...state,
            }
        }
        case 'REMOVE_INVITE_RECEIVED': {
            state.CallList[0].participants.splice(
                state.CallList[0].participants.findIndex(participant =>
                participant.userId === action.payload.userId), 1
            )            
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