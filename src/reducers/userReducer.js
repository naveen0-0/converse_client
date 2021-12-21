const initialState = {
  username : "",
  email : "",
  loggedIn : false,
  chatId:null
}

export const userReducer = (state = initialState,action) => {
  switch (action.type) {
      case "UPDATE_USER":
          return {
              username : action.payload.username,
              email : action.payload.email,
              loggedIn: action.payload.loggedIn,
              chatId:action.payload.chatId
          }
      default:
          return state;
  }
}