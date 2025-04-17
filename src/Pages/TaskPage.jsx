import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskFormModal from "../Components/TaskFormModal";
import useLocalStorage from "use-local-storage";
import TaskSphere from "../Components/TaskSphere";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../Components/features/tasks/taskSlice";
import UpdateForm from "../Components/UpdateForm";




export default function TaskPage() {


    const tasks = useSelector(state => state.tasks.tasks)
    const dispatch = useDispatch()
    const [selectTask, setSelectTask] = useState(false)
    const handleEdit = (task) => {
        setSelectTask(tasks)
        setUpdateModal(true)
    }
    const [updateModal, setUpdateModal] = useState(false)



    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            const decodedToken = jwtDecode(token)
            const userId = decodedToken.id
            dispatch(fetchTasks(userId))
        }
    }, [dispatch])

    const navigate = useNavigate();
    const [authToken, setAuthToken] = useLocalStorage('authToken', '')



    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (!authToken) {
            navigate('/login')
        }

    },);

    const handleLogout = () => {
        setAuthToken('')
    };



    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>TaskSphere</Navbar.Brand>
                    <Navbar.Text>Welcome</Navbar.Text>
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Row className="mb-4">
                    <Col>
                        <Button onClick={() => setShowModal(true)} >Add Task</Button>
                    </Col>
                </Row>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {
                        tasks.length > 0 ? (
                            tasks.map((data) => (
                                <Col key={data.id}>
                                    <TaskSphere key={data.id} title={data.title} description={data.description} status={data.status} priority={data.priority} onEdit={handleEdit} />
                                </Col>
                            ))


                        ) : (
                            <Col>
                                <Card className="text-center" style={{ maxWidth: "500px", margin: "0 auto" }}>
                                    <Card.Body>
                                        <Card.Title>No Tasks Yet</Card.Title>
                                        <Card.Text className="text-muted">
                                            Looks like you don't have any tasks. Get started by adding a new one!
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => setShowModal(true)}>
                                            Add Your First Task
                                        </Button>
                                    </Card.Body>

                                </Card>
                            </Col>
                        )


                    }
                </Row>
            </Container>
            <TaskFormModal
                show={showModal}
                onHide={() => setShowModal(false)}


            />
            <UpdateForm show={updateModal} onHide={() => setUpdateModal(false)} tasks={selectTask} />


        </>

    );
}