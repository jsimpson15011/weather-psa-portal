import React, {useEffect} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {getAnnouncement} from "../selectors";
import * as t from "../actions"
import {IAnnouncement} from "../model";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import generator from "generate-password"

const validationSchema = yup.object({
    announcementName: yup
        .string()
        .required('Announcement name is Required'),
    email: yup
        .string()
        .email('Valid Email is Required')
        .required('Email is Required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    isAdmin: yup
        .bool()
})


const AnnouncementForm = ({announcements, dispatch}: { announcements: { announcements: IAnnouncement[] }, dispatch: any }) => {
    useEffect(() => {
        dispatch(t.fetchAnnouncement())
    }, [dispatch])

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            announcementName: "",
            email: "",
            password: generator.generate({length: 10, numbers: true}),
            isAdmin: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                dispatch(t.updateAnnouncement({title: values.announcementName, body:"", expiration:new Date(), id: 3, isApproved: true}))
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
        <Box p={2} maxWidth="100%" width={900} m="auto" bgcolor="#f7f7f7">
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    margin="normal"
                    id="announcementName"
                    name="announcementName"
                    label="Announcement Name or Email"
                    value={formik.values.announcementName}
                    onChange={formik.handleChange}
                    error={formik.touched.announcementName && Boolean(formik.errors.announcementName)}
                    helperText={formik.touched.announcementName && formik.errors.announcementName}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    id="password"
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                />
                <FormControlLabel control={
                    <Checkbox
                        id="isAdmin"
                        name="isAdmin"
                        value={formik.values.isAdmin}
                        onChange={formik.handleChange}
                    />
                } label="Announcement is an admin"
                />

                <Button type="submit" variant="contained" color="primary">Add Announcement</Button>
            </form>
        </Box>
    )
}

export default connect(
    createStructuredSelector({
        announcements: getAnnouncement
    })
)(AnnouncementForm)