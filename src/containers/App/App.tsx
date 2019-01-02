import { I18nProvider } from "@lingui/react";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { i18n, language } from "../../services/i18n";
import { Layout } from "../Layout";
import { ConnectedLogin } from "../Login";

const App = () => {
  return (
    <I18nProvider i18n={i18n} language={language}>
      <Layout>
        <Router>
          <Route exact path="/" component={ConnectedLogin} />
        </Router>
      </Layout>
    </I18nProvider>
  );
};

export { App };
