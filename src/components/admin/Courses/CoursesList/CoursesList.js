import React, { useState, useEffect } from 'react';
import DragSortableList from "react-drag-sortable";
//antd components
import { List, Button, Modal as ModalAntd, notification } from "antd";
//custom components
import Modal from "../../../Modal";
import AddEditCourseForm from "../AddEditCourseForm";
//api
import { getCourseDataUdemyApi, deleteCourseApi, updateCourseApi } from "../../../../api/course";
import { getAccessTokenApi } from "../../../../api/auth";
//icons
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
//SASS
import "./CoursesList.scss";

const { confirm } = ModalAntd;

export default function CoursesList(props) {
    const { courses, setReloadCourses } = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listCoursesArray = [];
        courses.forEach(course => {
            listCoursesArray.push({
                content: (
                    <Course course={course} deleteCourse={deleteCourse} editCourseModal={editCourseModal} />
                )
            })
        });
        setListCourses(listCoursesArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses]);

    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.course;
            const order = item.rank;
            updateCourseApi(accessToken, _id, { order });
        });
    };

    const addCourseModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo curso");
        setModalContent(
            <AddEditCourseForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
            />
        );
    };

    const editCourseModal = (course) => {
        setIsVisibleModal(true);
        setModalTitle("Actulizando curso");
        setModalContent(
            <AddEditCourseForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
                course={course}
            />
        );
    };

    const deleteCourse = (course) => {
        const accessToken = getAccessTokenApi();
        confirm({
            title: "Removing course",
            content: `Are you sure to remove this ${course.idCourse}?`,
            okText: "Remove",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                deleteCourseApi(accessToken, course._id)
                    .then(response => {
                        const typeNotication = response.code === 200 ? "success" : "warning";
                        notification[typeNotication]({
                            message: response.message
                        });
                        setReloadCourses(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: "Server error, retry later"
                        });
                    });
            }
        });
    };

    return (
        <div className="courses-list">
            <div className="courses-list__header">
                <Button type="primary" onClick={addCourseModal}>
                    Nuevo curso
                </Button>
            </div>
            <div className="courses-list__items">
                {listCourses.length === 0 ? (
                    <h2 style={{ textAlign: "center", margin: 0 }}>
                        There are no courses
                    </h2>
                ) : (
                    <DragSortableList
                        items={listCourses}
                        onSort={onSort}
                        type="vertical"
                    />
                )}
            </div>

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
};

function Course(props) {
    const { course, deleteCourse, editCourseModal } = props;
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse)
            .then(response => {
                if (response.code !== 200) {
                    notification["warning"]({
                        message: `The course with id ${course.idCourse} there not found`,
                    });
                }
                setCourseData(response.data);
            })
    }, [course]);

    if (!courseData) {
        return null;
    }

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={(e) => editCourseModal(course)}
                    icon={<EditOutlined />}
                />,
                <Button
                    type="danger"
                    onClick={(e) => deleteCourse(course)}
                    icon={<DeleteOutlined />}
                />,
            ]}
        >
            <img
                src={courseData.image_480x270}
                alt={courseData.title}
                style={{ width: "100px", marginRight: "20px" }}
            />
            <List.Item.Meta
                title={`${courseData.title} | ID: ${course.idCourse}`}
                description={courseData.headline}
            />
        </List.Item>
    );
};