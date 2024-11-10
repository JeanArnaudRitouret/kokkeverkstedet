import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Accordion, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/platform_old/api/courses/')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    }, []);

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Available Courses</h1>
            {courses.length === 0 ? (
                <p>No courses available.</p>
            ) : (
                <Accordion>
                {courses.map((course, index) => (
                    <Accordion.Item eventKey={String(index)} key={course.id}>
                        <Accordion.Header>{course.title}</Accordion.Header>
                        <Accordion.Body>
                            <Card>
                                <Card.Body>
                                    {/* <p><strong>ID:</strong> {course.id}</p>
                                    <p><strong>Title:</strong> {course.title || "No title available"}</p> */}
                                    <h5>Modules</h5>
                                        {course.modules && course.modules.length > 0 ? (
                                            <ListGroup variant="flush">
                                                {course.modules.map(module => (
                                                    module && (
                                                        <ListGroup.Item key={module.id}>
                                                            <Link to={`/content/${module.id}`}>
                                                                <strong>{module.title}</strong> - {module.type_extracted || "No type available"} - {module.id || "No type available"}
                                                            </Link>
                                                        </ListGroup.Item>
                                                    )
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p>No modules available for this course.</p>
                                        )}
                                </Card.Body>
                            </Card>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            )}
        </Container>
    );
};


export default CourseList;