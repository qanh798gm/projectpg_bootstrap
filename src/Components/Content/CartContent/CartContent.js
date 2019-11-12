import React, { Component } from 'react'
import {
    Container, Button, Table, ButtonGroup,
    InputGroup, Input, Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import image from '../ListContent/img/i78700.jpg'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from '../../../axios'
import Auxilinary from '../../Auxilinary';

const TotalPrice = ({ cart }) => {
    return (
        <strong>
            {cart.reduce((sum, i) => (
                sum += i.quantity * i.price
            ), 0)}
        </strong>
    )
}

class CartContent extends Component {

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
        console.log(this.props.cart)
        if (this.props.cart.length === 0) {
            this.props.history.push('/empty-cart')
        }
        else {
            if (this.props.token) {
                if (this.props.cart) {
                    let totalPrice = this.props.cart.reduce((sum, i) => (
                        sum += i.quantity * i.price
                    ), 0)
                    const cart = this.props.cart
                    this.setState({ cart })
                    this.props.setTotalPrice(totalPrice)
                }
            }
        }

    }

    componentWillUpdate() {
        if (this.props.cart.length === 0) {
            this.props.history.push('/empty-cart')
        }
    }

    addToCart = (_id, quantity, price) => {
        const product = {
            _id: _id,
            quantity: parseInt(quantity),
            price: price
        }

        axios.post(`/users/addToCart`, product,
            { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then(response => {
                if (response.data) {
                    response.data.cart.map(item => {
                        response.data.cartDetail.map(newItem => {
                            if (item.id === newItem._id) {
                                Object.assign(newItem, { quantity: item.quantity })
                            }
                        })
                    })

                    this.props.setCart(response.data.cartDetail)
                    console.log(this.props.cart)
                }
                else {
                    console.log('cart error')
                }
            })
    }

    removeProduct(_id) {
        const product = {
            _id: _id
        }
        console.log(product)
        axios.patch(`/users/remove-product`, product,
            { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then(response => {
                if (response.data) {
                    response.data.cart.map(item => {
                        response.data.cartDetail.map(newItem => {
                            if (item.id === newItem._id) {
                                Object.assign(newItem, { quantity: item.quantity })
                            }
                        })
                    })
                    let totalPrice = this.props.cart.reduce((sum, i) => (
                        sum += i.quantity * i.price
                    ), 0)
                    this.props.setTotalPrice(totalPrice)
                    this.props.setCart(response.data.cartDetail)
                    this.toggle()
                }
                else {
                    console.log('remove error')
                }
            })
    }

    render() {

        const cart = this.props.cart ? this.props.cart.map((item, i) => {
            return (
                <tr>
                    <th>{i + 1}</th>
                    <td>
                        <img src={`http://localhost:3001/products/${item._id}/image`}
                            alt="Product" height="48px" width="64px" />
                        <text>&nbsp; {item.name}</text>
                    </td>
                    <td>{item.price}£</td>
                    <td>
                        <Col sm={{ size: '4', offset: '0' }}>
                            <InputGroup>
                                <Input
                                    onChange={(event) => { this.addToCart(item._id, (event.target.value - item.quantity), item.price) }}
                                    type="number" value={item.quantity} min='1' />
                            </InputGroup>
                        </Col>
                    </td>
                    <td>
                        {item.quantity * item.price}£
                        </td>
                    <td>
                        <ButtonGroup size="sm">
                            <Button
                                onClick={this.toggle}

                                color="danger">
                                Remove
                            </Button>

                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Confirmation</ModalHeader>
                                <ModalBody>
                                    Are you sure to remove this product?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => this.removeProduct(item._id)}>Yes</Button>
                                    <Button color="secondary" onClick={this.toggle}>No</Button>
                                </ModalFooter>
                            </Modal>

                        </ButtonGroup>
                    </td>
                </tr>
            )
        }) : null

        return (
            <Container>
                <br />
                <center><h2>Your Cart</h2></center>
                <br />

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Total</th>
                            <th>
                                <TotalPrice cart={this.props.cart} />£
                            </th>
                            <th>
                                <Link to="/checkout">
                                    <Button color="info">Checkout</Button>
                                </Link>
                            </th>
                        </tr>
                    </tfoot>
                </Table>
            </Container >
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        email: state.email,
        _id: state._id,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTotalPrice: (data) => dispatch({
            type: 'SET_TOTAL_PRICE',
            payload: {

                totalPrice: data,
            }
        }),
        setCart: (data) => dispatch({
            type: 'SET_CART',
            payload: {
                cart: data
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContent)