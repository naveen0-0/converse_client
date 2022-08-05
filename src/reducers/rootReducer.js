import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { friendsReducer } from './friendsReducer'
import { selectedFriendsReducer } from './selectedFriendsIdReducer'
import { serverUrlReducer } from './serverUrlReducer'
import { groupsReducer } from './groupsReducer'
import { selectedGroupReducer } from './selectedGroupReducer'

export const rootReducer = combineReducers({
  user:userReducer,
  friends : friendsReducer,
  selectedFriends:selectedFriendsReducer,
  serverUrl : serverUrlReducer,
  groups : groupsReducer,
  selectedGroup : selectedGroupReducer
})