import React, { Component } from 'react'
import {
    Breadcrumb, BreadcrumbItem,
    Container
} from 'reactstrap'
import { Link } from 'react-router-dom'

class Breadcrumbs extends Component {
    render() {
        return (
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="#">Library</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Data</BreadcrumbItem>
                </Breadcrumb>
            </Container>
        )
    }
}

export default Breadcrumbs