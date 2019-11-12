import React, { Component } from 'react'
import {
    InputGroup, Input,
    Container, Row, Col, Button,
    FormGroup, Label,
    Collapse, Card, CardBody,
    Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import axios from '../../../axios'
import { connect } from 'react-redux'

const TotalPrice = ({ cart }) => {
    return (
        <strong>
            {cart.reduce((sum, i) => (
                sum += i.quantity * i.price
            ), 0)}
        </strong>
    )
}

class CheckoutContent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)
        this.toggleClose = this.toggleClose.bind(this)
        this.toggleConfirm = this.toggleConfirm.bind(this)
        this.state = {
            collapse: false,
            modal: false,
            address: '',
            phone: '',
            note: '',
            payment: '',
        };
    }

    componentDidMount() {
        console.log(this.props.cart)
        console.log(this.props.totalPrice)
    }

    toggle() {
        this.setState({ payment: 'Paypal' })
        this.setState({ collapse: true })
    }

    toggleClose() {
        this.setState({ payment: 'Payment at delivery' })
        this.setState({ collapse: false })
    }

    toggleConfirm() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    postDataHandler = () => {
        let detail = []
        detail.push(this.state.address)
        detail.push(this.state.phone)
        detail.push(this.state.note)
        detail.push(this.state.payment)

        let totalPrice = this.props.cart.reduce((sum, i) => (
            sum += i.quantity * i.price
        ), 0)

        const order = {
            products: this.props.cart,
            totalPrice: totalPrice,
            detail: detail,
            owner: this.props._id,
            status: 'Pending'
        }
        axios.post('/orders', order,
            { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then(response => {
                console.log(response.data)
                if (response.data) {
                    let products = []
                    let product = {}
                    let totalPrice = 0
                    let productQuantity = 0

                    this.props.setCart(products)
                    this.props.setTotalPrice(totalPrice)
                    this.props.setProduct(product)
                    this.props.setProductQuantity(productQuantity)

                    axios.patch('/users/clear-cart', {},
                        { headers: { "Authorization": `Bearer ${this.props.token}` } })
                        .then(response => {
                            console.log('cart clear')
                        })

                    this.props.history.push('/successful')
                }
                else {
                    console.log('error')
                }
            })
    }

    render() {
        const products = this.props.cart.map((product, i) => {
            return (
                <tr>
                    <th>{i + 1}</th>
                    <td>
                        <img src={`http://localhost:3001/products/${product._id}/image`}
                            alt="Product" height="48px" width="64px" />
                        <text>&nbsp; {product.name}</text>
                    </td>
                    <td>{product.price}£</td>
                    <td>{product.quantity}</td>
                    <td>{product.price * product.quantity}£</td>
                </tr>
            )
        })
        return (
            <Container>
                <Row>
                    <Col>
                        <br />
                        <center><h2>Your Products</h2></center>
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: '10', offset: '1' }}>
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
                                {products}
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
                                </tr>
                            </tfoot>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: '6', offset: 3 }}>
                        <br />
                        <center><h2>Checkout Form</h2></center>
                        <br />
                        <InputGroup>
                            <Input
                                onChange={(event) => this.setState({ address: event.target.value })}
                                placeholder="Address" type="text" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input
                                onChange={(event) => this.setState({ phone: event.target.value })}
                                placeholder="Phone" type="text" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input
                                onChange={(event) => this.setState({ note: event.target.value })}
                                placeholder="Note" type="text" />
                        </InputGroup>
                        <br />
                        <FormGroup tag="fieldset">
                            <legend>Payment methods</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        onChange={(event) => this.setState({ payment: event.target.value })}
                                        value='Payment at delivery.'
                                        type="radio" name="radio1" onClick={this.toggleClose} />
                                    Payment at delivery
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        onChange={(event) => this.setState({ payment: event.target.value })}
                                        value='Paypal.'
                                        type="radio" name="radio1" onClick={this.toggle} />
                                    Paypal
                                </Label>
                                <Collapse isOpen={this.state.collapse}>
                                    <Card>
                                        <CardBody>
                                            Anim pariatur cliche reprehenderit,
                                             enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                             anim keffiyeh helvetica, craft beer labore wes anderson cred
                                             nesciunt sapiente ea proident.
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </FormGroup>
                        </FormGroup>
                        <center>
                            <Button onClick={this.toggleConfirm} color="primary">
                                Submit
                            </Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggleConfirm} className={this.props.className}>
                                <ModalHeader toggle={this.toggleConfirm}>Confirmation</ModalHeader>
                                <ModalBody>
                                    Confirm order?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.postDataHandler}>Yes</Button>
                                    <Button color="secondary" onClick={this.toggleConfirm}>No</Button>
                                </ModalFooter>
                            </Modal>
                        </center>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        _id: state._id,
        cart: state.cart,
        totalPrice: state.totalPrice
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
        setTotalPrice: (data) => dispatch({
            type: 'SET_TOTAL_PRICE',
            payload: {
                totalPrice: data
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContent)