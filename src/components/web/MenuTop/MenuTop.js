import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
//antd components
import { Menu } from "antd";
//custom components
import SocialLinks from "../SocialLinks";
//api
import { getMenusApi } from "../../../api/menu";
//img
import MenuLogo from "../../../assets/img/png/menu-top-logo.png";
//SASS
import "./MenuTop.scss";

export default function MenuTop() {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        getMenusApi()
            .then(response => {
                const listMenu = [];
                const { menus } = response;

                menus &&
                menus.forEach((item) => {
                    item.active && listMenu.push(item);
                });
                setMenuData(listMenu);
            });
    }, []);

    return (
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}>
                    <img src={MenuLogo} alt="MENU_LOGO" />
                </Link>
            </Menu.Item>

            {
                // eslint-disable-next-line array-callback-return
                menuData.map((item) => {
                    const external = item.url.indexOf("http") > -1 ? true : false;

                    if (external) {
                        return (
                            <Menu.Item key={item._id} className="menu-top-web__item">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            </Menu.Item>
                        );
                    };

                    return (
                        <Menu.Item key={item._id} className="menu-top-web__item">
                            <Link to={item.url}>{item.title}</Link>
                        </Menu.Item>
                    )
                })
            }
            
            <SocialLinks />
        </Menu>
    );
}
