import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from '../Login';
import styles from './App.module.scss';
import classnames from 'classnames';


const App = () =>{
  return (
    <div className={classnames(styles.app, 'bp3-dark')}>
      <Router>
        <Route exact path="/" component={Login} />
      </Router>
    </div>
  );
}

export { App };
