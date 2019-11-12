import React, { Component } from 'react'
import {
    Container, Jumbotron
} from 'reactstrap'

export default class EmptyOrderContent extends Component {
  render() {
    return (
        <Container>
        <br />
        <Jumbotron fluid>
            <Container fluid>
                <center>
                    <h1 className="display-3"><i class="far fa-meh-blank"></i></h1>
                    <p className="lead">
                        Your order is empty
                    </p>
                </center>
            </Container>
        </Jumbotron>
    </Container >
    )
  }
}
