const serverUrl = "https://converse-yam6.onrender.com";
// const serverUrl = "http://localhost:5000";

const initialState = {
  serverUrl: serverUrl,
};

export const serverUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
