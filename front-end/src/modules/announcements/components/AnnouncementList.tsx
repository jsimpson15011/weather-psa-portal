import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getAnnouncement} from "../selectors";
import * as t from "../actions"
import {IAnnouncement} from "../model";
import {DataGrid, GridColDef, GridCellParams} from '@material-ui/data-grid'
import {Box, Button, Container, IconButton, Paper, Snackbar} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
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


    const [open, setOpen] = React.useState(false);
    const [justDeleted, setJustDeleted] = React.useState<any>(null);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleUndo = () => {
        try {
            dispatch(t.updateAnnouncement(justDeleted))
        } catch (e) {
            console.log(e)
        } finally {
            setOpen(false)
        }
    }

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
        , {
            field: "approve",
            headerName: "Approve/Disapprove",
            width: 200,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params: GridCellParams) => {
                const handleClick = (e: any, isApproved: any, id: any) => {
                    const announcementToUpdate = announcements.announcements.filter(announcement => {
                        return announcement.id === id
                    })[0]
                    const updatedAnnouncement = {...announcementToUpdate, isApproved: !announcementToUpdate.isApproved}
                    try {
                        dispatch(t.updateAnnouncement(updatedAnnouncement, id))
                    } catch (e) {
                        console.log(e)
                    }
                }
                const isApproved = params.getValue("isApproved")
                const approved = params.getValue("isApproved") ? "Disapprove" : "Approve"
                const id = params.getValue("id")
                return <Button color={isApproved ? "secondary" : "primary"} variant="outlined"
                               onClick={(e) => handleClick(e, isApproved, id)}>{approved}</Button>;
            }
        },
        {field: 'isApproved', width: 200, headerName: "Is Approved?"},
        {
            field: "delete",
            headerName: "Delete Announcement",
            width: 200,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params: GridCellParams) => {
                const handleClick = (e: any, id: any) => {
                    try {
                        const currentAnnouncement = announcements.announcements.filter(announcement => announcement.id === id)[0]
                        setJustDeleted(currentAnnouncement)
                        dispatch(t.deleteAnnouncement(id))
                        setOpen(true)
                    } catch (e) {
                        setJustDeleted(null)
                        console.log(e)
                    }
                }
                const id = params.getValue("id")
                return <IconButton aria-label="delete" onClick={(e) => handleClick(e, id)}>
                    <DeleteIcon/>
                </IconButton>;
            }
        },
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
        <Container maxWidth="lg">
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                message="Announcement Deleted"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleUndo}>
                            UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Paper elevation={3}>
                <Box p={3} width={"100%"} style={{boxSizing: "border-box"}}>
                    <DataGrid autoHeight rowHeight={100} columnBuffer={0} rows={announcementRows} columns={columns}
                              pageSize={20}/>
                </Box>
            </Paper>

        </Container>
    )
}

export default connect(
    createStructuredSelector({
        announcements: getAnnouncement
    })
)(AnnouncementList)