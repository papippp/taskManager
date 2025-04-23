import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateTasks } from './features/tasks/taskSlice'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function UpdateForm({ show, onHide, tasks }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('To DO')
    const [priority, setPriority] = useState(1)
    const [dueDate, setdueDate] = useState(null)
    const [datePicker, setDatePicker] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (tasks) {
            setTitle(tasks.title || '')
            setDescription(tasks.description || '')
            setStatus(tasks.status || 'To Do')
            setPriority(tasks.priority || 1)
            setdueDate(tasks.due_date ? new Date(tasks.due_date) : null)
        }
    }, [tasks])

    const handleSave = (e) => {
        e.preventDefault()
        dispatch(updateTasks({ id: tasks.id, title, description, status, priority, dueDate: dueDate ? dueDate.toISOString() : null }))
        onHide()
    }
    const handleDate = (date) => {
        setdueDate(date)
        setDatePicker(false)
    }

    return (
        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton className='bg-dark text-white'>
                <Modal.Title> Update Task</Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form >
                    <FloatingLabel className='mb-3' label='edit Title' controlId='taskTitle' >
                        <Form.Control
                            type='text'
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a task title
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel className='mb-3' label='edit description' controlId='taskDescription' >
                        <Form.Control
                            as='textarea'
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            style={{ height: '100px' }}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a task title
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <Form.Group className='mb-3'>
                        <Form.Label>Due date</Form.Label>
                        <div className='d-flex align-items-center position-relative'>
                            <DatePicker
                                selected={dueDate}
                                onChange={handleDate}
                                minDate={new Date()}
                                placeholderText='Select a due date'
                                className='form-control'
                                open={datePicker}
                                onClickOutside={() => setDatePicker(false)}
                                onInputClick={() => setDatePicker(true)}
                                dateFormat='MMMM d, yyyy'
                                showPopperArrow={true}
                                popperPlacement='bottom-start'
                                popperModifiers={[
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, 10],
                                        },
                                    },
                                ]}
                                calendarClassName='border-0 shadow'
                                wrapperClassName='w-100'
                            />
                            {dueDate && (
                                <Button
                                    variant='link'
                                    className='text-danger ms-2 position-absolute end-0'
                                    onClick={() => setdueDate(null)}
                                >
                                    <i className='bi bi-x'></i>
                                </Button>
                            )}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Edit Status</Form.Label>
                        <Form.Select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Priority</Form.Label>
                        <div className="d-flex gap-2">
                            <Button variant={priority === 1 ? 'primary' : 'outline-primary'} onClick={() => setPriority(1)} >
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
                            <i className='bi bi-x'></i> Cancel
                        </Button>
                        <Button className="me-1" variant="primary" onClick={handleSave}>
                            <i className='bi bi-save'></i> save
                        </Button>
                    </div>

                </Form>
            </Modal.Body>


        </Modal>

    )
}
