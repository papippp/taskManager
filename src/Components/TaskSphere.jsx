
import { Badge, Button, Card } from "react-bootstrap";
import UpdateForm from "./UpdateForm";
import { useDispatch } from "react-redux";
import { deleteTask } from "./features/tasks/taskSlice";

export default function TaskSphere({ id, title, description, status, priority, onEdit }) {
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
                    </div>
                    <Card.Text className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>{description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Badge bg="secondary">{getPriority(priority)}</Badge>
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-2">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            style={{ borderRadius: "6px" }}
                            onClick={() => onEdit({ title, description, status, priority })}
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
