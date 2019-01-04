import { I18nProvider } from "@lingui/react";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { i18n, language } from "../../services/i18n";
import { history } from "../../store";
import { Layout } from "../Layout";
import { ConnectedLogin } from "../Login";
import { Logout } from "../Logout";
import { NotFound } from "../NotFound/NotFound";
import { ConnectedProfile } from "../Profile";

const App = () => {
  return (
    <I18nProvider i18n={i18n} language={language}>
      <Layout>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login" component={ConnectedLogin} />
            <Route exact path="/profile" component={ConnectedProfile} />
            <Route exact path="/logout" component={Logout} />
            <Redirect exact from="/" to="/login" />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </Layout>
    </I18nProvider>
  );
};

export { App };
