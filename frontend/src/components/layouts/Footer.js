import React, { Fragment } from "react";


const Footer = () => {

  const date = new Date().getFullYear();
  return (
    <Fragment>
    <footer className="footer" >
      <p className="text-center mt-1">
      Copyright © Shopping Cart- {date}, All Rights Reserved
      </p>
    </footer>
    </Fragment>
  );
};

export default Footer;
