import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { friendsReducer } from './friendsReducer'
import { selectedFriendsReducer } from './selectedFriendsIdReducer'
import { messagesReducer } from './messagesReducer'

export const rootReducer = combineReducers({
  user:userReducer,
  friends : friendsReducer,
  selectedFriends:selectedFriendsReducer,
  messages : messagesReducer
})