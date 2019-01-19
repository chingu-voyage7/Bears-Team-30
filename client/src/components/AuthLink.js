import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const AuthLink = ({ linkText, route, text }) => (
  <p>
    {text}
    <Link className="log-button m-t-15" to={routes[route]}>{linkText}</Link>
  </p>
);

export default AuthLink;
