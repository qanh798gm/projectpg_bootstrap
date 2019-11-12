import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Button, ButtonGroup,
    Table
} from 'reactstrap'
import { Link } from 'react-router-dom'
import image from '../../../ListContent/img/i78700.jpg'
import { connect } from 'react-redux'
import axios from 'axios'

const TotalPrice = ({ cart }) => {
    return (
        <strong>
            {cart.reduce((sum, i) => (
                sum += i.quantity * i.price
            ), 0)}
        </strong>
    )
}

class OrderDetailContent extends Component {
    state = {
        products: [],
        totalPrice: 0,
        detail: [],
        status: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/order-detail/${this.props.match.params.orderID}`,
            { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then(response => {
                this.setState({ products: response.data.products })
                this.setState({ totalPrice: response.data.totalPrice })
                this.setState({ status: response.data.status })
                //this.props.setTotalPrice(response.data.totalPrice)
                this.setState({ detail: response.data.detail })
                console.log(this.state.detail)
            })
    }
    render() {
        const products = this.state.products.map((product, i) => {
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
                        <center><h2>Order Detail</h2></center>
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
                                        <strong>{this.state.totalPrice}£</strong>
                                    </th>
                                </tr>
                            </tfoot>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <center><h2>Information</h2></center>
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: '6', offset: '0' }}>
                        <h4 className="text-right">Status</h4>
                        <br />
                        <p className="text-right">Address:</p>
                        <p className="text-right">Phone Number</p>
                        <p className="text-right">Note</p>
                        <p className="text-right">Payment Method</p>
                    </Col>
                    <Col sm={{ size: '6', offset: '0' }}>
                        <h4>{this.state.status}</h4>
                        <br />
                        <p>{this.state.detail[0]}</p>
                        <p>{this.state.detail[1]}</p>
                        <p>{this.state.detail[2]}</p>
                        <p>{this.state.detail[3]}</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        totalPrice: state.totalPrice
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         setTotalPrice: (data) => dispatch({
//             type: 'SET_TOTAL_PRICE',
//             payload: {
//                 totalPrice: data
//             }
//         })
//     }
// }

export default connect(mapStateToProps)(OrderDetailContent)

