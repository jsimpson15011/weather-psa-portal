import React from "react"
import AnnouncementList from "../../../modules/announcements/components/AnnouncementList";
import {useParams, Link, useRouteMatch} from "react-router-dom";
import {Button} from "@material-ui/core";
import AnnouncementForm from "../../../modules/announcements/components/AnnouncementForm";

const Announcements = () => {
    const {action, id} = useParams<{
        action: string,
        id: string,
        screenId: string
    }>()
    let {url} = useRouteMatch()

    if (action === "edit") {
        return (
            <div>
                <h2>Announcement</h2>
                <div>
                    {id}
                </div>
            </div>
        )
    }
    if (action === "add"){
        return(
            <div>
                <AnnouncementForm/>
            </div>
        )
    }


    return (
        <div>
            <h2>Announcements</h2>
            <Button component={Link} to={`${url}/add`} variant="contained" color="primary">Add New Announcement</Button>
            <AnnouncementList/>
        </div>
    )
}

export default Announcements