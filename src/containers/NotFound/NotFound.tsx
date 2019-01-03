import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const NotFound: React.SFC<{}> = (props: {}) => {

  return (
    <div className={styles.container}>
      <h2 className="bp3-heading">404</h2>
      <p>Things are… rarely as they seem.</p>
      <Link to="/">Home</Link>
    </div>
  );
};
