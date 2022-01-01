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

      default:
        return state;
  }
}