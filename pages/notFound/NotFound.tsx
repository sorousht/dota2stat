import React from "react";
import "./styles.module.scss";
import Link from "next/link";

const NotFound: React.SFC<{}> = (props: {}) => {

  return (
    <div className="notfound-container">
      <h2 className="bp3-heading">404</h2>
      <p>Things are… rarely as they seem.</p>
      <Link href="/"><a>Home</a></Link>
    </div>
  );
};

export default NotFound;