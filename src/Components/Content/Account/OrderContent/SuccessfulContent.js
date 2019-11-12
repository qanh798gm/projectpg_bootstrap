import React, { Component } from 'react'
import {
    Container, Jumbotron
} from 'reactstrap'

export default class SuccessfulContent extends Component {
    render() {
        return (
            <Container>
                <br />
                <Jumbotron fluid>
                    <Container fluid>
                        <center>
                            <h1 className="display-3"><i style={{color:"#6DB65B"}} class="fas fa-smile-wink"></i></h1>
                            <p className="lead">
                                Order Successfully &nbsp; 
                                <i style={{color:"#6DB65B"}} class="fas fa-check"></i>
                            </p>
                        </center>
                    </Container>
                </Jumbotron>
            </Container >
        )
    }
}
