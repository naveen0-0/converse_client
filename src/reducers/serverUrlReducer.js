const serverUrl = "https://converse-1910.herokuapp.com"
const serverUrlDev = "https://localhost:5000"

const initialState = {
  serverUrl: serverUrl,
}


export const serverUrlReducer = (state = initialState,action) => {
  switch (action.type) {
      default:
          return state;
  }
}