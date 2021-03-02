import {combineReducers} from "redux";
import system from './system';
import users from "./users";
import announcements from "./announcements";

export default combineReducers({
    [system.constants.NAME]: system.reducer,
    [users.constants.NAME]: users.reducer,
    [announcements.constants.NAME]: announcements.reducer
})