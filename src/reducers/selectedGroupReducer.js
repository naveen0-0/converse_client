const initialState = {}

export const selectedGroupReducer = (state = initialState,action) => {
  switch (action.type) {
      case "UPDATE_GROUP":
        return action.payload

      case "ADD_MESSAGE_IN_GROUP":
        if(state.groupId === action.payload.groupId){
          return {
            ...state,
            messages : [
              ...state.messages, 
              { sender:action.payload.sender, message:action.payload.message, time:action.payload.time } 
            ]
          } 
        }
        
      case "ADD_USER_TO_THE_SELECTED_GROUP_IN_REDUX":
        if(state.groupId === action.payload.groupId){
          return {
            ...state,
            users : [
              ...state.users, 
              { username:action.payload.username , role : "member" } 
            ]
          } 
        }

      case "REMOVE_GROUP":
        return {}

      default:
        return state;
  }
}