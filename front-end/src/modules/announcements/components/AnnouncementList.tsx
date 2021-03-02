import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getAnnouncement} from "../selectors";
import * as t from "../actions"
import {IAnnouncement} from "../model";
import {DataGrid, GridColDef, GridCellParams} from '@material-ui/data-grid'
import {Button} from "@material-ui/core";
import {Link, useParams, useRouteMatch} from "react-router-dom";

const AnnouncementList = ({
                              announcements,
                              dispatch
                          }: { announcements: { announcements: IAnnouncement[] }, dispatch: any }) => {
    let {url} = useRouteMatch()
    const {action, id} = useParams<{
        action: string,
        id: string,
        screenId: string
    }>()
    url = url.replace("/" + action, '').replace("/" + id, '')

    useEffect(() => {
        dispatch(t.fetchAnnouncement())
    }, [dispatch])

    if (!announcements.announcements) {
        return (
            <div>
                Loading
            </div>
        )
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID'},
        {field: 'title', headerName: 'Announcement Name', width: 200},
        {
            field: "edit",
            headerName: "Edit",
            disableClickEventBubbling: true,
            renderCell: (params: GridCellParams) => {
                return <Link to={`${url}/edit/${params.getValue("id")}`}><Button>Edit</Button></Link>;
            }
        }
        ,{
            field: "approve",
            headerName: "Approve/Disapprove",
            disableClickEventBubbling: true,
            renderCell: (params: GridCellParams) => {
                const handleClick = (e:any, isApproved:any, id:any) => {
                    const announcementToUpdate = announcements.announcements.filter(announcement => {
                        return announcement.id === id
                    })[0]
                    const updatedAnnouncement = {...announcementToUpdate, isApproved: !announcementToUpdate.isApproved}
                    dispatch(t.updateAnnouncement(updatedAnnouncement, id))
                }
                const isApproved = params.getValue("isApproved")
                const approved = params.getValue("isApproved") ? "Disapprove" : "Approve"
                const id = params.getValue("id")
                return <Button onClick={(e) => handleClick(e, isApproved, id)}>{approved}</Button>;
            }
        },
        {field: 'isApproved', headerName: "Is Approved?"}
    ]

    const announcementRows = announcements.announcements.map(announcement => {
        return (
            {
                id: announcement.id,
                title: announcement.title,
                isApproved: announcement.isApproved
            }
        )
    })

    return (
        <div className="announcement-table">
            <DataGrid autoHeight rowHeight={100} columnBuffer={0} rows={announcementRows} columns={columns}
                      pageSize={20}/>
        </div>
    )
}

export default connect(
    createStructuredSelector({
        announcements: getAnnouncement
    })
)(AnnouncementList)