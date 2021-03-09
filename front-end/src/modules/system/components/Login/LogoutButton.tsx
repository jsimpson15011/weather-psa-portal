import * as t from "../../actionTypes";
import {Button} from "@material-ui/core";
import React from "react";
import {connect} from "react-redux";

const LogoutButton = ({dispatch}: { dispatch: any }) => {
    const handleLogout = ()=> {
        dispatch({type: t.LOGOUT, payload: {sessionId: 2}})
    }
    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    )
}

export default connect()(LogoutButton)
