import React, {
  Component
} from 'react'
import {
  Container,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  CardImg,
  Badge,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import {
  connect
} from 'react-redux'
import Auxilinary from '../Auxilinary'
import {
  Link
} from 'react-router-dom'
import logo from '../../assets/logo.png'
import axios from 'axios'
import {
  withRouter
} from 'react-router-dom'

const ProductQuantity = ({ cart }) => {
  if (cart) {
    return <text> {cart.reduce((sum, i) => (sum += i.quantity), 0)} </text>;
  } else {
    return null;
  }
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleCart = this.toggleCart.bind(this)
    this.toggleAccount = this.toggleAccount.bind(this)
    this.toggleLogout = this.toggleLogout.bind(this)
    this.state = {
      cartDropdownOpen: false,
      accountDropdownOpen: false,
      email: '',
      password: '',
      token: '',
      isLoggedIn: false,
      productQuantity: 0,
      toggleLogout: false
    }
  }

  toggleCart() {
    this.setState(prevState => ({
      cartDropdownOpen: !prevState.cartDropdownOpen
    }))
  }
  toggleAccount() {
    this.setState(prevState => ({
      accountDropdownOpen: !prevState.accountDropdownOpen
    }))
  }
  toggleLogout() {
    this.setState(prevState => ({
      toggleLogout: !prevState.toggleLogout
    }))
  }
  componentDidMount() {
    console.log(this.props.cart)
    if (this.props.token) {
      if (this.props.cart) {
        let totalPrice = this.props.cart.reduce((sum, i) => (
          sum += i.quantity * i.price

        ), 0)
        this.props.setTotalPrice(totalPrice)
      }

    }

  }
  postDataHandler = () => {
    const sendToken = {
      token: this.props.token
    }
    const account = {
      _id: '',
      name: '',
      email: '',
      token: '',
      cart: [],
      isLoggedIn: false,
      totalPrice: 0,
      detail: null,
      order: []
    }

    this.props.setUserValue(account)

    this.setState({
      productQuantity: 0
    })
    axios.post('http://localhost:3001/users/logout', sendToken, {
      headers: {
        "Authorization": `Bearer ${this.props.token}`
      }
    })
      .then(response => {
        this.props.setUserValue(account)
        this.props.history.push('/')
      })
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    let account;

    if (isLoggedIn) {
      account = (
        <Auxilinary>
          <Col>
            <Dropdown
              isOpen={this.state.accountDropdownOpen}
              toggle={this.toggleAccount}
            >
              <DropdownToggle color="info" caret>
                {" "}
                {this.props.name}{" "}
              </DropdownToggle>{" "}
              <DropdownMenu>
                {" "}
                <Link to="/profile">
                  <DropdownItem> Profile </DropdownItem>{" "}
                </Link>{" "}
                <Link to="/order">
                  <DropdownItem> Purchase History </DropdownItem>{" "}
                </Link>{" "}
                <DropdownItem divider />
                <DropdownItem onClick={this.toggleLogout}>
                  {" "}
                  Logout{" "}
                </DropdownItem>{" "}
              </DropdownMenu>{" "}
            </Dropdown>{" "}
          </Col>{" "}
          {/* Modal */}
          <Modal isOpen={this.state.toggleLogout} toggle={this.toggleLogout} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Logout</ModalHeader>
            <ModalBody>
              Are you sure to logout?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.postDataHandler}>Confirm</Button>{' '}
              <Button color="secondary" onClick={this.toggleLogout}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Auxilinary>
      );
    } else {
      account = (
        <Auxilinary>
          <Col
            sm={{
              size: "1"
            }}
          >
            <Link to="/register">Register </Link>{" "}
          </Col>{" "}
          <Col
            sm={{
              size: "1"
            }}
          >
            <Link to="/login">Login </Link>{" "}
          </Col>{" "}
        </Auxilinary>
      );
    }

    return (
      <div className="header">
        <Container>
          <br />
          <Row>
            {" "}
            {/* Account area */} {account}
            {/* Logo area */}{" "}
            <Col
              sm={{
                offset: "2"
              }}
            >
              <center>
                <Link to="/">
                  <CardImg src={logo} alt="logo" />
                </Link>{" "}
              </center>{" "}
            </Col>
            {/* Cart area */}{" "}
            <Col
              sm={{
                offset: "3"
              }}
            >
              <center>
                <Link to="/cart">
                  <Button outline color="danger">
                    <i class="fas fa-cart-plus"> </i> &nbsp;{" "}
                    <Badge color="danger">
                      <ProductQuantity cart={this.props.cart} />{" "}
                    </Badge>{" "}
                  </Button>{" "}
                </Link>{" "}
              </center>{" "}
            </Col>{" "}
          </Row>
        </Container>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    token: state.token,
    name: state.name,
    cart: state.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUserValue: data =>
      dispatch({
        type: "LOGOUT",
        payload: {
          _id: data._id,
          name: data.name,
          email: data.email,
          token: data.token,
          cart: data.cart,
          isLoggedIn: data.isLoggedIn,
          totalPrice: data.totalPrice,
          detail: data.detail,
          order: data.order
        }
      }),
    setTotalPrice: data =>
      dispatch({
        type: "SET_TOTAL_PRICE",
        payload: {
          totalPrice: data
        }
      })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
