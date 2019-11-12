import React, { Component } from 'react'
import axios from '../../../axios'
import {
    Container, Row, Col, Button, CardImg,
    InputGroup, Input,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { connect } from 'react-redux'

class SingleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            productQuantity: 0
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    componentDidMount() {
        axios.get(`/product-detail/${this.props.match.params.productID}`).then(response => {
            this.props.setProduct(response.data)
        })
        console.log(this.props.product)
        console.log(this.props.productQuantity)
    }

    addToCart = () => {
        if (this.props.token) {
            const product = {
                _id: this.props.product._id,
                quantity: this.state.productQuantity,
                price: this.props.product.price
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
                        //this.props.setproductQuantity({ productQuantity: 0 })
                        console.log(this.props.cart)
                    }
                    else {
                        console.log('cart error')
                    }
                })
        }
        else {
            this.toggle()
            this.props.history.push('/login')
        }

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={{ size: '4', offset: '0' }}>
                        <br />
                        <CardImg top width="100%" src={`http://localhost:3001/products/${this.props.product._id}/image`} />
                    </Col>
                    <Col sm={{ size: '5', offset: '2' }}>
                        <br />
                        <Row>
                            <h2>{this.props.product.name}</h2>
                        </Row>
                        <Row>
                            <p>{this.props.product.price}£</p>
                        </Row>
                        <Row>
                            <p>{this.props.product.description}</p>
                        </Row>
                        <Row>
                            <p></p>
                        </Row>
                        <Row>
                            <Col sm={{ size: '3' }}>
                                <InputGroup>
                                    <Input
                                        onChange={(event) => { this.setState({ productQuantity: event.target.value }) }}
                                        placeholder="0" type="number" min="0" />
                                </InputGroup>
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Button color='primary' onClick={this.addToCart}>Add to Cart</Button>
                        </Row>
                        <br />
                    </Col>
                </Row>
                {/* <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal> */}
            </Container>

        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        cart: state.cart,
        product: state.product,
        productQuantity: state.productQuantity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCart: (data) => dispatch({
            type: 'SET_CART',
            payload: {
                cart: data
            }
        }),
        setProduct: (data) => dispatch({
            type: 'SET_PRODUCT',
            payload: {
                product: data
            }
        }),
        setProductQuantity: (data) => dispatch({
            type: 'SET_PRODUCT_QUANTITY',
            payload: {
                productQuantity: data
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleContent)