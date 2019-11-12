import React, { Component } from 'react'
import {
    InputGroup, Input,
    Container, Row, Col, Button
} from 'reactstrap'
import { connect } from 'react-redux'
import axios from '../../../../axios'

class RegisterContent extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        age: '',
        isLoggedIn: false
    }
    postDataHandler = () => {
        const account = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            age: this.state.age,
            type: 'user'
        }
        axios.post('/users', account)
            .then(response => {
                console.log(response.data)
                if (response.data.token.length > 0) {
                    this.props.setUserValue(response.data)
                    this.props.history.push('/')
                    console.log(response.data.token)
                }
                else {
                    console.log('error')
                }
            })
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={{ size: '6', offset: 3 }}>
                        <br />
                        <center><h2>Register Form</h2></center>
                        <br />
                        <InputGroup>
                            <Input
                                onChange={(event) => this.setState({ name: event.target.value })}
                                placeholder="Your Name" type="text" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input
                                onChange={(event) => this.setState({ email: event.target.value })}
                                placeholder="Email" type="text" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input
                                onChange={(event) => this.setState({ password: event.target.value })}
                                placeholder="Password" type="password" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input
                                onChange={(event) => this.setState({ age: event.target.value })}
                                placeholder="age" type="number" />
                        </InputGroup>
                        <br />
                        <center><Button color="primary" onClick={this.postDataHandler}>Submit</Button></center>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserValue: (data) => dispatch({
            type: 'SET_USER',
            payload: {
                _id: data.user._id,
                name: data.user.name,
                email: data.user.email,
                token: data.token,
                isLoggedIn: true
            }
        })
    }
}

export default connect(null, mapDispatchToProps)(RegisterContent)