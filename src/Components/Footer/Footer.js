import React, { Component } from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap'

class Footer extends Component {
    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col sm={{ size: '2' }}>
                        <h5>Customer Service</h5>
                        <ul>
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                            <li>Option 4</li>
                        </ul>
                    </Col>
                    <Col sm={{ size: '2', offset: 1 }}>
                        <h5>My Account</h5>
                        <ul>
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                            <li>Option 4</li>
                        </ul>
                    </Col>
                    <Col sm={{ size: '2', offset: 1 }}>
                        <h5>About Us</h5>
                        <ul>
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                            <li>Option 4</li>
                        </ul>
                    </Col>
                    <Col sm={{ size: '2', offset: 1 }}>
                        <h5>Tool & Resources</h5>
                        <ul>
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                            <li>Option 4</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Footer