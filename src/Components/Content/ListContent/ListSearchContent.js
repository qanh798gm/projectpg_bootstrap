import React, { Component } from 'react'
import axios from '../../../axios'
import { Link } from 'react-router-dom'
import {
    Container, Row, Col, Button,
    Card,
    CardText,
    CardTitle,
    CardImg, CardBody
} from 'reactstrap'
import { connect } from 'react-redux'

class ListSearchContent extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        // axios.get(`/products/${this.props.match.params.categoryID}`).then(response => {
        //     this.setState({ products: response.data })
        //     this.props.setCategoryID(this.props.match.params.categoryID)
        //     this.props.setProducts(response.data)
        //     console.log(response.data)
        // })

    }

    render() {
        const products = this.props.products.map(product => {
            return (
                <Col sm={{ size: '4', offset: '0' }}>
                    <Card>
                        <CardImg top width="320px" height="240px" src={`http://localhost:3001/products/${product._id}/image`} />
                        <CardBody>
                            <CardTitle>{product.name}</CardTitle>
                            <CardText>{product.price}£</CardText>
                            <center>
                                <Link to={`/single/${product._id}`}>
                                    <Button color='info'>Detail</Button>
                                </Link>
                            </center>
                        </CardBody>
                    </Card>
                    <br />
                </Col>

            )
        })
        return (
            <Container>
                <br />
                <Row>
                    <Col sm={{ size: '3' }}>
                        <h5>Filter</h5>
                    </Col>
                    <Col sm={{ size: '9', offset: '0' }}>
                        <Row></Row>
                        <Row>
                            <br />
                            {products}
                        </Row>
                    </Col>
                </Row>
            </Container >
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        cart: state.cart,
        products: state.products,
        product: state.product,
        productQuantity: state.productQuantity,
        categoryID: state.categoryID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProducts: (data) => dispatch({
            type: 'SET_PRODUCTS',
            payload: {
                products: data
            }
        }),
        setCategoryID: (data) => dispatch({
            type: 'SET_CATEGORYID',
            payload: {
                categoryID: data
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSearchContent)
