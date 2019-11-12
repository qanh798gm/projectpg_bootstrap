import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux'
import styles from './NavBar.module.css'

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3001/categories/Component').then(response => {
            this.props.setComponent(response.data)
        })
        axios.get('http://localhost:3001/categories/Accessory').then(response => {
            this.props.setAccessory(response.data)
        })
    }

    moveToList(_id) {
        this.props.setCategoryID(_id)
        this.props.history.push(`/list/${_id}`);
        window.location.reload()
    }
    render() {
        const components = this.props.components.map(component => {
            return (
                <Link
                    onClick={() => this.moveToList(component._id)}
                // to={`/list/${component._id}`}
                >
                    <DropdownItem>{component.name}</DropdownItem>
                </Link >
            )
        })

        const accessories = this.props.accessories.map(accessory => {
            return (
                <Link
                    onClick={() => this.moveToList(accessory._id)}
                //to={`/list/${accessory._id}`}
                >
                    <DropdownItem>{accessory.name}</DropdownItem>
                </Link>
            )
        })

        return (
            <div>
                <Container>
                    <br />
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">Home</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className={styles.dropdown}>
                                        Components
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {components}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Accessories
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {accessories}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <NavLink href="/">Demo</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/">Demo 2</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        cart: state.cart,
        products: state.products,
        components: state.components,
        accessories: state.accessories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setComponent: (data) => dispatch({
            type: 'SET_COMPONENT',
            payload: {
                components: data
            }
        }),
        setAccessory: (data) => dispatch({
            type: 'SET_ACCESSORY',
            payload: {
                accessories: data
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))