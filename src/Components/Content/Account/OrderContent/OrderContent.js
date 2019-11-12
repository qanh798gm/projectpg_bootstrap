import React, { Component } from 'react'
import {
    Container,
    Button,
    Row,
    Col,
    Table,
    Pagination, PaginationItem, PaginationLink,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import Auxilinary from '../../../Auxilinary'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from '../../../../axios'
import Moment from 'react-moment'
import 'moment-timezone'

class OrderContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {

        axios.get('/orders-by-me',
            { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then(response => {
                console.log(response.data)
                if (response.data.length === 0) {
                    this.props.history.push('/empty-order')
                } else {
                    this.props.setOrder(response.data)
                }
            })

    }

    setStatus(_id) {
        const order = {
            _id: _id,
            status: 'Cancelled'
        }
        axios.patch('/orders', order,
            { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then(response => {
                axios.get('/orders-by-me',
                    { headers: { "Authorization": `Bearer ${this.props.token}` } })
                    .then(response => {
                        console.log(response.data)
                        this.props.setOrder(response.data)
                        this.toggle()
                    })
            })
    }

    render() {
        const pageArray = new Array()
        const pageNumber = Math.floor(this.props.order.length / 5 + 1)
        const startIndex = this.props.startIndex
        const length = this.props.length

        for (let i = 0; pageArray.length < pageNumber; i++) {
            pageArray.push(i + 1)
        }

        const pages = pageArray.map((number, i) => {
            let step = 4
            if (i === 0) {
                step = 0
            } else if (i > 0) {
                step = step * i
            } else {
                step = 0
            }
            return (
                <PaginationItem>
                    <PaginationLink onClick={() => {
                        this.props.setPage(i + step, i + 5 + step);
                        console.log(step)
                    }}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            )
        })
        console.log(this.state.order)
        console.log(this.props.order)
        const order = this.props.order.slice(startIndex, length).map((item, i) => {
            let icon = null
            if (item.status === 'Pending') {
                icon = <i className="fas fa-spinner" />
            } else if (item.status === 'Delivering') {
                icon = <i className="fas fa-truck" />
            } else if (item.status === 'Delivered') {
                icon = <i className="fas fa-check" />
            } else if (item.status === 'Cancelled') {
                icon = <i className="fas fa-times" />
            }

            let cancelButton = null
            if (item.status === 'Pending') {
                cancelButton = <Auxilinary>
                    <Button
                        onClick={this.toggle}
                        color='danger' size='sm'>
                        Cancel
                    </Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Confirmation</ModalHeader>
                        <ModalBody>
                            Are you sure to cancel this order?
                     </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.setStatus(item._id)}>Yes</Button>
                            <Button color="secondary" onClick={this.toggle}>No</Button>
                        </ModalFooter>
                    </Modal>

                </Auxilinary>
            } else {
                cancelButton = null
            }
            return (
                <tr>
                    <td>{i + startIndex + 1}</td>
                    <td>
                        <Moment format="DD-MM-YYYY HH:mm">
                            {item.createdAt}
                        </Moment>
                    </td>
                    <td>{item.products[0].quantity}</td>
                    <td>{item.totalPrice}£</td>
                    <td>
                        {icon}
                        &nbsp;
                        {item.status}
                    </td>
                    <td>
                        <Link to={`/order-detail/${item._id}`}>
                            <Button color='info' size='sm'>
                                Detail
                            </Button>
                        </Link>
                    </td>
                    <td>
                        {cancelButton}
                    </td>
                </tr>
            )
        })
        return (
            <Auxilinary>
                <Container>
                    <Row>
                        <Col>
                            <br />
                            <center><h2>Purchase History</h2></center>
                            <br />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{ size: '8', offset: '2' }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Product Quantity</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order}

                                </tbody>
                            </Table>


                            <Pagination aria-label="Page navigation example">
                                {pages}

                            </Pagination>

                        </Col>
                    </Row>
                </Container>

            </Auxilinary>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        page: state.page,
        order: state.order,
        startIndex: state.startIndex,
        length: state.length,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPage: (startIndex, length) => dispatch({
            type: 'SET_PAGE',
            payload: {
                startIndex: startIndex,
                length: length
            }
        }),
        setOrder: (data) => dispatch({
            type: 'SET_ORDER',
            payload: {
                order: data
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContent)
