
import { Badge, Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import UpdateForm from "./UpdateForm";
import { useDispatch } from "react-redux";
import { deleteTask } from "./features/tasks/taskSlice";
import { differenceInDays, format, isPast, isToday, isTomorrow } from "date-fns";

export default function TaskSphere({ id, title, description, status, priority, dueDate, onEdit }) {
    const dispatch = useDispatch()
    const handleDelete = () => {
        const isConfirmed = window.confirm('Are sure you want to delete permanently')
        if (isConfirmed) {
            dispatch(deleteTask(id))
        }
    }


    const getPriority = (priority) => {
        switch (Number(priority)) {
            case 1:
                return 'low';
            case 2:
                return 'medium';
            case 3:
                return 'high';
            default:
                return 'low'
        }
    }

    const getStatus = (status) => {
        switch (status?.toLowerCase()) {
            case 'to do':
                return 'info';
            case 'in progress':
                return 'warning';
            case 'done':
                return 'success';
            default:
                return 'info'

        }
    }

    const dateBadge = (dueDate, status) => {
        if (!dueDate) return null;
        try {
            const date = new Date(dueDate);
            if (isNaN(date.getTime())) {
                console.warn(`Invalid due date: ${dueDate}`);
                return <Badge bg='danger'>Invalid Date</Badge>;
            }

            let variant = 'secondary';
            let text = format(date, 'MMM d');

            if (isPast(date) && status?.toLowerCase() !== 'done') {
                variant = 'danger';
                text = 'Overdue';
            } else if (isToday(date)) {
                variant = 'warning';
                text = 'Today';
            } else if (isTomorrow(date)) {
                variant = 'info';
                text = 'Tomorrow';
            } else if (differenceInDays(date, new Date()) <= 7) {
                variant = 'primary';
                text = format(date, 'EEE');
            }

            return (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{format(date, 'MMMM d, yyyy')}</Tooltip>}
                >
                    <Badge bg={variant} className="ms-2">
                        {text}
                    </Badge>
                </OverlayTrigger>
            );
        } catch (error) {
            console.error('Error processing date:', error);
            return null;
        }

    }




    return (
        <>

            <Card className="mb-3 task-card"
                style={{
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    minWidth: "250px",
                    transition: "transform 0.2s",
                }}
            >
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                        <Card.Title style={{ fontSize: "1.1rem" }}>{title}</Card.Title>
                        <Badge bg={getStatus(status)}>{status || 'To do'}</Badge>
                        {dateBadge(dueDate, status)}
                    </div>
                    <Card.Text className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>{description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Badge bg={
                            getPriority(priority) === 'low' ? "primary" :
                                getPriority(priority) === 'medium' ? "secondary" :
                                    getPriority(priority) === 'high' ? "danger" :
                                        'primary'

                        }

                        >{getPriority(priority)}</Badge>

                        {dueDate && !isNaN(new Date(dueDate).getTime()) && (
                            <small className="text-muted">
                                Due: {format(new Date(dueDate), "MMM d, yyyy")}
                            </small>
                        )}


                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-2">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            style={{ borderRadius: "6px" }}
                            onClick={() => onEdit({ id, title, description, status, priority, dueDate })}
                        >
                            <i className="bi bi-pen"></i>
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            style={{ borderRadius: "6px" }}
                            onClick={handleDelete}
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                        <Button
                            variant="outline-success"
                            size="sm"
                            style={{ borderRadius: "6px" }}
                        >
                            <i className="bi bi-arrow-right"></i>
                        </Button>
                    </div>




                </Card.Body>
            </Card>



        </>
    );
};

//  return (
//    <div className="d-flex flex-wrap gap-3">
//      ppp
//</div>
//);
