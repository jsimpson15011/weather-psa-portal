import {Link, useParams} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {connect} from "react-redux";
import React from "react";
import * as t from "../../actionTypes";

const Menu = ({dispatch} : {dispatch: any}) => {
    let {screenId} = useParams<Record<string, string | undefined>>();

    const handleLogout = ()=> {
        dispatch({type: t.LOGOUT, payload: {sessionId: 2}})
    }

    return (
        <BottomNavigation value={screenId||""} showLabels>
            <BottomNavigationAction
                component={Link}
                to="/admin"
                label="Dashboard"
                value=""
                icon={<DashboardIcon/>}
            />
            <BottomNavigationAction
                component={Link}
                to="/admin/users"
                label="Users"
                value="users"
                icon={<PeopleIcon/>}
            />
            <BottomNavigationAction
                component={Link}
                to="/admin/announcements"
                label="Announcements"
                value="announcements"
                icon={<AnnouncementIcon/>}
            />
            <BottomNavigationAction
                onClick={handleLogout}
                label="Log Out"
                value="Log Out"
                icon={<ExitToAppIcon/>}
            />
        </BottomNavigation>
    )
}

export default connect()(Menu)