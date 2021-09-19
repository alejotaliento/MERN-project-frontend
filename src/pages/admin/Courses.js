import React, { useState, useEffect } from 'react';
//custom components
import CoursesList from "../../components/admin/Courses/CoursesList";
//api
import { getCoursesApi } from "../../api/course";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [reloadCourses, setReloadCourses] = useState(false);

    useEffect(() => {
        getCoursesApi().then(response => {
            setCourses(response.courses);
        })
        setReloadCourses(false);
    }, [reloadCourses]);

    return (
        <div>
            <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
        </div>
    );
}
