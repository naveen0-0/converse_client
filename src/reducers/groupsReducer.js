const initialState = []

export const groupsReducer = (state = initialState,action) => {
  switch (action.type) {
    case "UPDATE_GROUPS":
      return action.payload

    case "ADD_GROUP":
      return [ action.payload, ...state ]

    case "ADD_MESSAGE_IN_GROUPS":
      return state.map((group) => {
        if(group.groupId === action.payload.groupId){
          group.messages.push({ sender:action.payload.sender, message:action.payload.message, time:action.payload.time })
          return group
        }
        return group
      })
      
    case "ADD_USER_TO_THE_GROUPS_IN_REDUX":
      return state.map((group) => {
        if(group.groupId === action.payload.groupId){
          group.users.push({ username : action.payload.username, role : "member" })
          return group
        }
        return group
      })
    
    default:
      return state;
  }
}