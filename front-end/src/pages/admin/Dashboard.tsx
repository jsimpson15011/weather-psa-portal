import React from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Screen from "./Screen";
import Menu from "../../modules/system/components/Nav/Menu";

const Dashboard = () => {
    let {path} = useRouteMatch();

    return (
        <AdminLayout>
            <h1>Admin</h1>
            <Switch>
                <Route exact path={path}>
                    <Menu/>
                    <div>Welcome</div>
                </Route>
                <Route path={`${path}/:screenId/:action?/:id?`}>
                    <Menu/>
                    <Screen/>
                </Route>
            </Switch>
        </AdminLayout>
    )
}

export default Dashboard