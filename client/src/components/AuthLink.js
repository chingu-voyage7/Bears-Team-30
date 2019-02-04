import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const AuthLink = ({ className, linkText, route, text }) => (
  <p>
    {text}
    <Link className={className} to={routes[route]}>
      {linkText}
    </Link>
  </p>
);

export default AuthLink;
