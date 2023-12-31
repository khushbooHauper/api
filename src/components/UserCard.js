import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

function UserCard({ onEdit,onDelete, users, disabled }) {
  return (
    <div className="container">
      <Row>
        {users &&
          users.map((user, index) => (
            <Col key={index} md={4} style={{ marginBottom: "20px" }}>
              <Card style={{ width: "18rem", marginBottom: "20px" }}>
                <Card.Body>
                  <Card.Title>Name: {user?.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Company: {user?.company.name}
                  </Card.Subtitle>
                  <Card.Text>Email: {user?.email}</Card.Text>
                  <Button
                    variant="primary"
                    className="m-2"
                    onClick={() => onEdit(user?.id)}
                    disabled={disabled}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => onDelete(user?.id)}
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

export default UserCard;
