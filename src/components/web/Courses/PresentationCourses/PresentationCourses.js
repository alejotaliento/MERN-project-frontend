import React from 'react';
//images
import AcademyLogo from "../../../../assets/img/png/academy-logo.png";
//SASS
import "./PresentationCourses.scss";

export default function PresentationCourses() {
    return (
        <div className="presentation-courses">
            <img src={AcademyLogo} alt="My courses"></img>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non possimus culpa, quam nihil
                quo nobis, ex et minima maiores veritatis laborum quia porro iusto quaerat enim voluptatibus
                accusantium consectetur similique!
            </p>
            <hr/>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non possimus culpa, quam nihil</p>
        </div>
    );
};
