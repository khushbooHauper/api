import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

function TodoCard({ onEdit, onDelete, todos, disabled }) {
  return (
    <div classtitle="container">
      <Row>
        {todos &&
          todos.map((todo, index) => (
            <Col key={index} md={4} style={{ marginBottom: "20px" }}>
              <Card style={{ width: "18rem", marginBottom: "20px" }}>
                <Card.Body>
                  <Card.Title>title: {todo?.title}</Card.Title>
                  {/* <Card.Subtitle classtitle="mb-2 text-muted">
                    Company: {todo?.company.title}
                  </Card.Subtitle>
                  <Card.Text>Email: {todo?.email}</Card.Text> */}
                  <Button
                    variant="primary"
                    className="m-2"
                    onClick={() => onEdit(todo?.id)}
                    disabled={disabled}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => onDelete(todo?.id)}
                    disabled={disabled}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default TodoCard;
