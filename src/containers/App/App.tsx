import { I18nProvider } from "@lingui/react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { i18n, language } from "../../services/i18n";
import { Layout } from "../Layout";
import { ConnectedLogin } from "../Login";
import { ConnectedProfile } from "../Profile";

const App = () => {
  return (
    <I18nProvider i18n={i18n} language={language}>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={ConnectedLogin} />
            <Route exact path="/profile" component={ConnectedProfile} />
          </Switch>
        </Router>
      </Layout>
    </I18nProvider>
  );
};

export { App };
