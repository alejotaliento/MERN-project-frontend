import React, { useState, useEffect } from "react";
// authentication
import { getAccessTokenApi } from "../../../api/auth";
// API
import { getUsersActiveApi } from "../../../api/user";
// SASS
import "./Users.scss";
// components
import ListUsers from "../../../components/admin/Users/ListUsers";

export default function Users() {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();

    useEffect(() => {
        getUsersActiveApi(token, true).then(response => {
            setUsersActive(response.users);
        });
        getUsersActiveApi(token, false).then(response => {
            setUsersInactive(response.users);
        });
        setReloadUsers(false);
    }, [token, reloadUsers]);

    return (
        <div className="users">
            <ListUsers 
            usersActive={usersActive} 
            usersInactive={usersInactive} 
            setReloadUsers={setReloadUsers} 
            />
        </div>
    );
}

