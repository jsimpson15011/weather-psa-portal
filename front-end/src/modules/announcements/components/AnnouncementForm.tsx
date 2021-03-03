import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getAnnouncement} from "../selectors";
import * as t from "../actions"
import {IAnnouncement} from "../model";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Paper,
    TextField
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    announcementName: yup
        .string()
        .required('Announcement name is Required'),
    body: yup
        .string()
})


const AnnouncementForm = ({
                              announcements,
                              dispatch,
                              currentId
                          }: { announcements: { announcements: IAnnouncement[] }, dispatch: any, currentId?: number }) => {
    useEffect(() => {
        dispatch(t.fetchAnnouncement())
    }, [dispatch])

    let history = useHistory();
    const currentAnnouncement = announcements.announcements.filter(announcement => announcement.id === currentId)[0]

    const formik = useFormik({
        initialValues: {
            announcementName: currentAnnouncement ? currentAnnouncement.title : "",
            body: currentAnnouncement ? currentAnnouncement.body : "",
            isApproved: currentAnnouncement ? currentAnnouncement.isApproved : true
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                dispatch(t.updateAnnouncement({
                    title: values.announcementName,
                    body: values.body,
                    expiration: new Date(),
                    isApproved: values.isApproved,
                    id: currentAnnouncement ? currentAnnouncement.id : null
                }, currentAnnouncement ? currentAnnouncement.id : null))
                history.push('/admin/announcements')
            } catch (e) {
                console.log(e.message)
            }
        }
    })

    if (!announcements.announcements) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={7}>
                <Box p={3} width={"100%"} style={{boxSizing: "border-box"}}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            margin="normal"
                            id="announcementName"
                            name="announcementName"
                            label="Title"
                            value={formik.values.announcementName}
                            onChange={formik.handleChange}
                            error={formik.touched.announcementName && Boolean(formik.errors.announcementName)}
                            helperText={formik.touched.announcementName && formik.errors.announcementName}
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="body"
                            name="body"
                            label="Content"
                            value={formik.values.body}
                            onChange={formik.handleChange}
                            error={formik.touched.body && Boolean(formik.errors.body)}
                            helperText={formik.touched.body && formik.errors.body}
                            fullWidth
                            multiline
                            variant="outlined"
                            rows={5}
                            rowsMax={20}
                        />
                        <FormControlLabel control={
                            <Checkbox
                                id="isApproved"
                                name="isApproved"
                                value={formik.values.isApproved}
                                onChange={formik.handleChange}
                            />
                        } label="Show Announcement on Site"
                                          checked={formik.values.isApproved}
                        />
                        <Button type="submit" variant="contained" color="primary">{currentAnnouncement ? "Edit Announcement" : "Add Announcement"}</Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    )
}

export default connect(
    createStructuredSelector({
        announcements: getAnnouncement
    })
)(AnnouncementForm)