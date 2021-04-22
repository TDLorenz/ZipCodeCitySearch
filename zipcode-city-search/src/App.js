import React, { Component, useState } from 'react';
import './App.css';
import ZipSearch from './components/ZipSearch';
//import {BrowserRouter as Router, Route, Swith} from 'react-router-dom';
import { HashRouter as Router, Route, Swith } from 'react-router-dom';
import NavBar from "./components/NavBar"
import CitySearch from './components/CitySearch';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />

          <Route exact path='/' component={ZipSearch} />
          <Route exact path='/CitySearch' component={CitySearch} />

        </Router>
      </>
    );
  }
}

export default App;