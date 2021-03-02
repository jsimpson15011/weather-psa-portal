import * as t from './actionTypes';
import {IAnnouncement} from "./model";

const initialState: IAnnouncement[] = []

const reducer = (state = initialState, action: any): IAnnouncement[] => {
    const announcements = action.payload
    switch (action.type) {
        case t.GET:
            return announcements
        default:
            return state
    }
}

export default reducer