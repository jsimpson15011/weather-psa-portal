import * as t from './actionTypes'
import {IAnnouncement} from "./model";
import axios from "axios";
import {AppThunk} from "../index";

const getAnnouncement = (announcements: IAnnouncement[]) => ({
    type: t.GET,
    payload: { announcements }
})

export const fetchAnnouncement = (
    id?: number
): AppThunk => async dispatch => {
    const response = await axios.get("/api/announcements")
    dispatch(
        getAnnouncement(response.data)
    )
}

export const updateAnnouncement = (
    announcementInfo: IAnnouncement, id?: number|null
): AppThunk => async dispatch => {
    await axios.post(id ? "/api/announcements/" + id : "/api/announcements", {...announcementInfo})

    const announcements = await axios.get("/api/announcements")
    dispatch(
        getAnnouncement(announcements.data)
    )
}