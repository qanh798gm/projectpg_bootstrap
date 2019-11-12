import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    CardText,
    CardTitle,
    Button
} from 'reactstrap'

class Featured extends Component {
    render() {
        return (
            <Container>
                <Row><h2>Featured Products</h2></Row>
                <br />
                <Row>
                    <Col sm={{ size: '3', offset: 1 }}>
                        <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm={{ size: '3', offset: 1 }}>
                        <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                    <Col sm={{ size: '3', offset: 1 }}>
                        <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Featured