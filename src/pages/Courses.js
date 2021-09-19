import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
//antd components
import { Row, Col, Spin, notification } from "antd";
//custom components
import PresentationCourses from "../components/web/Courses/PresentationCourses";
import CoursesList from "../components/web/Courses/CoursesList";
//api
import { getCoursesApi } from "../api/course";

export default function Courses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        getCoursesApi()
            .then(response => {
                if (response?.code !== 200) { // la expresion ?. comprueba que el objeto contenga la propiedad señalada (en este caso code)
                    notification["warning"]({
                        message: response.message
                    });
                } else {
                    setCourses(response.courses);
                }
            })
            .catch(err => {
                notification["error"]({
                    message: "Sever error, please retry later"
                });
            });
    }, []);

    return (
        <>
            <Helmet>
                <title>Courses | Alejo Taliento</title>
                <meta name="description" content="Courses page example" data-react-helmet="true" />
            </Helmet>
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <PresentationCourses />
                    {!courses ? (
                        <Spin
                            tip="Cargando cursos"
                            style={{ textAlign: "center", width: "100%", padding: "20px" }}
                        />
                    ) : (
                        <CoursesList courses={courses} />
                    )}
                </Col>
                <Col md={4} />
            </Row>
        </>
    );
};