import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Hello from './components/Hello.js';
import './App.css';

class App extends Component {

    render() {
        return (
            <Router>
                <Route exact path={ '/'} component={Hello}  />
            </Router>
        );
    }
}

export default App;
