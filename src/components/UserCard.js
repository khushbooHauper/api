import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

function UserCard({onEdit, users}) {
 

  return (
    <div className="container">
      <Row>
      {users && users.map((user,index)=>(
        <Col key={index} md={4} style={{ marginBottom: "20px" }}>
        <Card style={{ width: "18rem" , marginBottom: "20px"}}>
          <Card.Body>
            <Card.Title>Name: {user?.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Company: {user?.company.name}</Card.Subtitle>
            <Card.Text>Email: {user?.email}</Card.Text>
            <Button variant="primary" onClick={()=>onEdit(user?.id)}>Edit</Button>
          </Card.Body>
        </Card>
        </Col>
        ))}
      </Row>
    </div>
  );
}

export default UserCard;
