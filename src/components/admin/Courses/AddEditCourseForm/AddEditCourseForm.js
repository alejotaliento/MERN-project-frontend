import React, { useState, useEffect } from 'react';
//antd components
import { Form, Input, Button, notification } from "antd";
//api
import { getAccessTokenApi } from "../../../../api/auth";
import { addCourseApi, updateCourseApi } from "../../../../api/course";
//icons antd
import { KeyOutlined, FileGifOutlined, DollarOutlined, LinkOutlined } from "@ant-design/icons";
//SASS
import "./AddEditCourseForm.scss";

export default function AddEditCourseForm(props) {
    const { setIsVisibleModal,
        setReloadCourses,
        course //on case to edit
    } = props;
    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        course ? setCourseData(course) : setCourseData({});
    }, [course]);

    const addCourse = (e) => {
        if (!courseData.idCourse) {
            notification["error"]({
                message: "Course ID required"
            });
        } else {
            const accessToken = getAccessTokenApi();

            addCourseApi(accessToken, courseData)
                .then(response => {
                    const typeNotication = response.code === 200 ? "success" : "warning";
                    notification[typeNotication]({
                        message: response.message
                    });
                    setIsVisibleModal(false);
                    setReloadCourses(true);
                    setCourseData({});
                })
                .catch(err => {
                    notification["error"]({
                        message: "Server error, please retry later"
                    });
                });
        }
    };

    const updateCourse = (e) => {
        const accessToken = getAccessTokenApi();

        updateCourseApi(accessToken, course._id, courseData)
            .then(response => {
                const typeNotication = response.code === 200 ? "success" : "warning";
                notification[typeNotication]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadCourses(true);
                setCourseData({});
            })
            .catch(err => {
                notification["error"]({
                    message: "Server error, please retry later"
                });
            });
    };

    return (
        <div className="add-edit-course-form">
            <AddEditForm
                course={course}
                addCourse={addCourse}
                updateCourse={updateCourse}
                courseData={courseData}
                setCourseData={setCourseData}
            />
        </div>
    );
};

function AddEditForm(props) {
    const { course,
        addCourse,
        updateCourse,
        courseData,
        setCourseData
    } = props;

    return (
        <Form className="add-edit-form" onFinish={course ? updateCourse : addCourse}>
            <Form.Item>
                <Input
                    prefix={<KeyOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
                    placeholder="ID of course"
                    value={courseData.idCourse}
                    onChange={e => setCourseData({ ...courseData, idCourse: e.target.value })}
                    disabled={course ? true : false}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LinkOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
                    placeholder="URL"
                    value={courseData.link}
                    onChange={e => setCourseData({ ...courseData, link: e.target.value })}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<FileGifOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
                    placeholder="Coupon for discount"
                    value={courseData.coupon}
                    onChange={e => setCourseData({ ...courseData, coupon: e.target.value })}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<DollarOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
                    placeholder="Price"
                    value={courseData.price}
                    onChange={e => setCourseData({ ...courseData, price: e.target.value })}
                ></Input>
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-submit"
                >
                    {course ? "Actualizar curso" : "Crear nuevo curso"}
                </Button>
            </Form.Item>
        </Form>
    );
};
