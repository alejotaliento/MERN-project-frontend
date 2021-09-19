import React from 'react';
//custom components
import SocialLinks from "../../SocialLinks";
//img
import WebLogo from "../../../../assets/img/png/react-logo.png";
//SASS
import "./MyInfo.scss";

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={WebLogo} alt="Logo web" />
            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h4>
            <SocialLinks />
        </div>
    );
}
