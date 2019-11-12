import React from 'react';
// import './App.css';
import Header from './Components/Header/Header'
import Auxilinary from './Components/Auxilinary'
import Footer from './Components/Footer/Footer';
import Layout from './Components/Layout';
import { BrowserRouter } from "react-router-dom";
import NavBar from './Components/NavBar/NavBar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

function App() {
  return (
    // <BrowserRouter>
    <Auxilinary>
      {/* <Header />
        <NavBar /> */}

      <Layout />

      {/* <Footer /> */}
    </Auxilinary>
    // </BrowserRouter>
  )
}

export default App
