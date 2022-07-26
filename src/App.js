import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route, Routes} from "react-router-dom";

import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentUser: null
    }
  }
  render()
  {
    return (
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/shop" element={<ShopPage/>}/>
          <Route path="/signin" element={<SignInAndSignUpPage/>}/>
        </Routes>
      </div>
    );
  }
}
