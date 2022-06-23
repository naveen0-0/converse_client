const serverUrl = "https://converse-1910.herokuapp.com"

const initialState = {
  serverUrl: serverUrl,
}


export const serverUrlReducer = (state = initialState,action) => {
  switch (action.type) {
      default:
          return state;
  }
}