const initialState = []

export const notificationReducer = (state = initialState,action) => {
  switch (action.type) {

    case "ADD_NOTIFICATION":
      return [...state,{ id: action.payload.id , content : action.payload.content }]

    case "REMOVE_NOTIFICATION":
      return state.filter(note => note.id !== action.payload)

    case "REMOVE_ALL_NOTIFICATION":
      return []
    default:
      return state;
  }
}