const initialState = {}

export const selectedFriendsReducer = (state = initialState,action) => {
  switch (action.type) {
      case "UPDATE_FRIEND":
        return action.payload

      case "ADD_MESSAGE":
        if(state._id === action.payload.id){
          return {
            ...state,
            messages : [...state.messages, action.payload.info ]
          } 
        }

      case "REMOVE_FRIEND":
        return {}

      default:
        return state;
  }
}