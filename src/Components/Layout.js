import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import HomeContent from './Content/HomeContent/HomeContent'
import RegisterContent from './Content/Account/RegisterContent.js/RegisterContent';
import Auxilinary from './Auxilinary';
import LoginContent from './Content/Account/LoginContent/LoginContent';
import ListContent from './Content/ListContent/ListContent';
import SingleContent from './Content/SingleContent/SingleContent';
import CartContent from './Content/CartContent/CartContent';
import CheckoutContent from './Content/CheckoutContent/CheckoutContent';
import ProfileContent from './Content/Account/ProfileContent/ProfileContent';
import OrderContent from './Content/Account/OrderContent/OrderContent';
import OrderDetailContent from './Content/Account/OrderContent/OrderDetailContent/OrderDetailContent';
import SuccessfulContent from './Content/Account/OrderContent/SuccessfulContent';
import EmptyCartContent from './Content/CartContent/EmptyCartContent';
import Header from './Header/Header';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import EmptyOrderContent from './Content/Account/OrderContent/EmptyOrderContent';
import { BrowserRouter } from "react-router-dom";
import Search from './Search/Search';
import ListSearchContent from './Content/ListContent/ListSearchContent';

export default class Layout extends Component {
    render() {
        return (
            <BrowserRouter>
            <Auxilinary>
                <Header />
                <Search />
                <NavBar />

                <Route exact path="/" component={HomeContent} />
                <Route path="/register" component={RegisterContent} />
                <Route path="/login" component={LoginContent} />
                <Route path="/list/:categoryID" component={ListContent} />
                <Route path="/single/:productID" component={SingleContent} />
                <Route path="/cart" component={CartContent} />
                <Route path="/checkout" component={CheckoutContent} />
                <Route path="/profile" component={ProfileContent} />
                <Route path="/order" component={OrderContent} />
                <Route path="/order-detail/:orderID" component={OrderDetailContent} />
                <Route path="/successful" component={SuccessfulContent} />
                <Route path="/empty-cart" component={EmptyCartContent} />
                <Route path="/empty-order" component={EmptyOrderContent} />
                <Route path="/list-search" component={ListSearchContent} />

                <Footer />
            </Auxilinary>
            </BrowserRouter>
        )
    }
}
