import React, { Component } from 'react'
import {
    Container,
    Button,
    Row,
    Col,
    FormGroup, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { connect } from 'react-redux'
import Auxilinary from '../../../Auxilinary'
import { Link } from 'react-router-dom'
import image from '../../ListContent/img/i78700.jpg'
import styles from './ProfileContent.module.css'

class ProfileContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailModal: false,
            nameModal: false,
            passwordModal: false
        }

        this.toggleEmail = this.toggleEmail.bind(this)
        this.toggleName = this.toggleName.bind(this)
        this.togglePassword = this.togglePassword.bind(this)
    }

    toggleEmail() {
        this.setState(prevState => ({
            emailModal: !prevState.emailModal
        }))
    }

    toggleName() {
        this.setState(prevState => ({
            nameModal: !prevState.nameModal
        }))
    }

    togglePassword() {
        this.setState(prevState => ({
            passwordModal: !prevState.passwordModal
        }))
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <br />
                        <center><h2>Your Profile</h2></center>
                        <br />
                    </Col>
                </Row>
                <Row>
                    {/* Label */}
                    <Col sm={{ size: '2', offset: 1 }}>
                        <p className="text-right">Your Email</p>
                        <p className="text-right">Your name</p>
                        <p className="text-right">Your password</p>
                        <p className="text-right">Your gender</p>
                    </Col>

                    {/* Info */}
                    <Col sm={{ size: '3', offset: 0 }}>
                        <FormGroup>
                            <text>{this.props.email} &nbsp;</text>
                            <Link onClick={this.toggleEmail}>Change</Link>
                            {/* Modal */}
                            <Modal isOpen={this.state.emailModal} toggle={this.toggleEmail} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                                <ModalBody>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleEmail}>Do Something</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleEmail}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                        </FormGroup>
                        <FormGroup>
                            <text>{this.props.name} &nbsp;</text>
                            <Link onClick={this.toggleName}>Change</Link>
                            {/* Modal */}
                            <Modal isOpen={this.state.nameModal} toggle={this.toggleName} className={this.props.className}>
                                <ModalHeader toggle={this.toggleName}>Modal title</ModalHeader>
                                <ModalBody>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleName}>Do Something</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleName}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </FormGroup>
                        <FormGroup>
                            <text>******GM &nbsp;</text>
                            <Link onClick={this.togglePassword}>Change</Link>
                            {/* Modal */}
                            <Modal isOpen={this.state.passwordModal} toggle={this.togglePassword} className={this.props.className}>
                                <ModalHeader toggle={this.togglePassword}>Modal title</ModalHeader>
                                <ModalBody>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.togglePassword}>Do Something</Button>{' '}
                                    <Button color="secondary" onClick={this.togglePassword}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </FormGroup>
                        <FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" />
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" />
                                    Female
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <br />
                        <Button>Update</Button>
                    </Col>
                    <Col sm={{ size: '6', offset: 0 }}>
                        <center>
                            <br />
                            <img className="rounded-circle" alt="avatar" 
                            src={`http://localhost:3001/users/${this.props._id}/avatar`}
                            width="128" height="128" />
                            <br />
                            <br />
                            <label for="file-upload" className={styles.custom}>
                                <i className="fa fa-cloud-upload"></i>Upload
                            </label>
                            <input id="file-upload" type="file" />
                            <p >Max size is 1MB</p>
                            <p>File types: PNG, JPG</p>
                        </center>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        _id: state._id,
        name: state.name,
        email: state.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCart: (data) => dispatch({
            type: 'SET_CART',
            payload: {
                cart: {
                    _id: data._id,
                    quantity: data.quantity,
                    price: data.price
                }
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContent)


