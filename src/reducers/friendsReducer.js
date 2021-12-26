const initialState = []

export const friendsReducer = (state = initialState,action) => {
  switch (action.type) {
      case "UPDATE_FRIENDS":
          return action.payload

      case "ADD_FRIEND":
        return [
          ...state,
          action.payload
        ]

      case "MAKE_A_FRIEND":
        return state.map((friend) => {
          if(friend._id === action.payload){
            friend.requestAcceptedOrNot = true
            return friend
          }
          return friend
        })

      case "REMOVE_A_FRIEND":
        return state.filter((friend) => friend._id !== action.payload)

      default:
          return state;
  }
}