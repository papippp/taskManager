import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { createTasks } from './features/tasks/taskSlice';

export default function TaskFormModal({ show, onHide }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('todo')
    const [priority, setPriority] = useState(1)

    const dispatch = useDispatch()

    const handleSave = (e) => {
        e.preventDefault()
        dispatch(createTasks({ title, description, status, priority }))
        onHide()
        setTitle('')
        setDescription('')
        setStatus('To Do')
        setPriority('1')
    }


    return (
        <Modal show={show} onHide={onHide} centeredbackdrop="static">
            <Modal.Header closeButton className="bg-dark text-white">
                <Modal.Title>
                    Create Task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave} >
                    <FloatingLabel controlId="titleInput" label="Task Title" className="mb-3">
                        <Form.Control
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a task title
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="descriptionInput" label="Description" className="mb-3" >
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            style={{ height: '100px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a task description
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Priority</Form.Label>
                        <div className="d-flex gap-2">
                            <Button variant={priority === 1 ? 'primary' : 'outline-primary'} onClick={() => setPriority(1)}>
                                Low
                            </Button>
                            <Button variant={priority === 2 ? 'secondary' : 'outline-secondary'} onClick={() => setPriority(2)} >
                                Medium
                            </Button>
                            <Button variant={priority === 3 ? 'danger' : 'outline-danger'} onClick={() => setPriority(3)}>
                                High
                            </Button>
                        </div>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>
                            <FaTimes className="me-1" /> Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            <FaSave className="me-1" />
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}