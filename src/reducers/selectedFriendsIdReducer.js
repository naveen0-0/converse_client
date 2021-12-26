const initialState = {}

export const selectedFriendsReducer = (state = initialState,action) => {
  switch (action.type) {
      case "UPDATE_FRIEND":
          return action.payload
      default:
          return state;
  }
}