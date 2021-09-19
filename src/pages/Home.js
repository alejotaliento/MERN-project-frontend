import React from "react";
import { Helmet } from "react-helmet";
//custom components
import MainBanner from "../components/web/MainBanner";
import HomeProjects from "../components/web/HomeProjects";
import HowMyCoursesWork from "../components/web/HowMyCoursesWork";
import ReviewCourses from "../components/web/ReviewCourses";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>React App | Alejo Taliento</title>
        <meta name="description" content="Home page example" data-react-helmet="true"/>
      </Helmet>
      <MainBanner />
      <HomeProjects />
      <HowMyCoursesWork />
      <ReviewCourses />
    </>
  );
}