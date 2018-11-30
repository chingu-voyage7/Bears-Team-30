import React from "react";
import { Link } from "react-router-dom";

import * as routes from "../../constants/routes";

const AuthLink = ({ linkText, route, text }) => (
  <p>
    {text}
    <Link to={routes[route]}>{linkText}</Link>
  </p>
);

export default AuthLink;