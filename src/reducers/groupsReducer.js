const initialState = []

export const groupsReducer = (state = initialState,action) => {
  switch (action.type) {
    case "UPDATE_GROUPS":
      return action.payload

    case "ADD_GROUP":
      return [ ...state, action.payload ]

    case "ADD_MESSAGE_IN_GROUPS":
      return state.map((group) => {
        if(group.groupId === action.payload.groupId){
          group.messages.push({ sender:action.payload.sender, message:action.payload.message, time:action.payload.time })
          return group
        }
        return group
      })
    
    default:
      return state;
  }
}