import React, { useState, useEffect } from 'react';
//api
import { getMenusApi } from "../../../api/menu";
//components
import MenuWebList from "../../../components/admin/MenuWeb/MenuWebList";

export default function MenuWeb(props) {
    //states
    const [menus, setMenus] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

    useEffect(() => {
        getMenusApi().then(response => {
            setMenus(response.menus)
        });
        setReloadMenuWeb(false);
    }, [reloadMenuWeb]);


    return (
        <div className="menu-web">
            <MenuWebList menus={menus} setReloadMenuWeb={setReloadMenuWeb}></MenuWebList>
        </div>
    );
}
