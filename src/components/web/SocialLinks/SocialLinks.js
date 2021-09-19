import React from 'react';
//icons
import { ReactComponent as YoutubeIcon } from "../../../assets/img/svg/youtube.svg";
import { ReactComponent as TwitterIcon } from "../../../assets/img/svg/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/img/svg/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../../assets/img/svg/linkedin.svg";
//SASS
import "./SocialLinks.scss";

export default function SocialLinks() {
    return (
        <div className="social-links">
            <a href="https://www.youtube.com" className="youtube" target="_blank" rel="noopener noreferrer">
                <YoutubeIcon />
            </a>
            <a href="https://www.twitter.com/alejotaliento" className="twitter" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
            </a>
            <a href="https://www.facebook.com/alejotaliento" className="facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
            </a>
            <a href="https://ar.linkedin.com/in/alejo-taliento-287035170" className="linkedin" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
            </a>
        </div>
    );
}
