import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import * as routes from '../constants/routes';
import UserChallengesList from './UserChallengesList';

import '../styles/sidebar.scss';
import '../styles/login-signup.scss';
import '../styles/base.scss';



const Sidebar = ({ data }) => (
  <header className="sidebar">
    <nav className="sidebar-navigation">
      <div></div>
      <div className="sidebar-container">
        <div className="sidebar-header fadeInDown">
          <Link to={routes.DASHBOARD}>
            <span className="title">100</span>
            <br></br>
            <span className="days">Days</span>
          </Link>
        </div>

        <div className="fadeInUp">
          <div className="sidebar-header">
            <h2>{data && data.me && data.me.username}</h2>
          </div>
          <div className="sidebar-items">
            <UserChallengesList />
          </div>
        </div>

      </div>
    </nav>
  </header>

);

export default graphql(gql`
  query ME {
    me {
      username
    }
  }
`)(Sidebar);
