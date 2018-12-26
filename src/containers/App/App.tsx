import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from '../Login';
import styles from './App.module.scss';
import classnames from 'classnames';
import { I18nProvider } from '@lingui/react'
import { language, i18n } from '../../services/i18n';

const App = () => {
  return (
    <I18nProvider i18n={i18n} language={language}>
      <div className={classnames(styles.app, 'bp3-dark')}>
        <Router>
          <Route exact path="/" component={Login} />
        </Router>
      </div>
    </I18nProvider>
  );
}

export { App };
