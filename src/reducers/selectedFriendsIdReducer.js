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

      default:
        return state;
  }
}