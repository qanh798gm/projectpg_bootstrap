import React, { Component } from 'react'
import {
    Container,
    Button,

    Row,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,

} from 'reactstrap'
import { connect } from 'react-redux'
import axios from '../../axios'
import { withRouter } from 'react-router-dom'

class Search extends Component {
    state = {
        keyword: ''
    }

    postDataHandler = () => {
        console.log(this.state.keyword)
        const keyword = this.state.keyword
        axios.get(`/products-search?name=${keyword}`).then(response => {
            
            this.props.setProducts(response.data)
            console.log(this.props.products)
            this.props.history.push("/list-search")
        })
    }
    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col sm={{ size: '6', offset: 3 }}>
                        <InputGroup>
                            <Input
                                value={this.state.keyword}
                                onChange={(event) => this.setState({ keyword: event.target.value })}
                                placeholder="Search.." type="text" />
                            <InputGroupAddon
                                addonType="append">
                                <Button
                                    onClick={this.postDataHandler}
                                    color="secondary">Search</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        keyword: state.keyword,
        products: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setKeyWord: (data) => dispatch({
            type: 'SET_KEYWORD',
            payload: {
                keyword: data
            }
        }),
        setProducts: (data) => dispatch({
            type: 'SET_PRODUCTS',
            payload: {
                products: data
            }
        })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
