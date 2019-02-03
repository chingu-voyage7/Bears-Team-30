import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import * as routes from '../constants/routes';
import { ME } from '../constants/queries';
import UserChallengesList from './UserChallengesList';

const Sidebar = ({ history }) => (
  <Query query={ME} partialRefetch={true}>
    {({ loading, error, client, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <header className="sidebar">
          <nav className="sidebar-navigation">
            <div></div>
            <div className="sidebar-container">
              <div className="sidebar-header">
                <Link to={routes.DASHBOARD}>
                  <span className="title">100</span>
                  <br></br>
                  <span className="days">Days</span>
                </Link>
              </div>

              <div>
                <div className="sidebar-header">
                  <h2>{data.me.username}</h2>
                </div>
                <div className="sidebar-items">

                  <button className="button-small"
                    onClick={e => {
                      e.preventDefault();

                      localStorage.setItem('token', null);
                      client.clearStore().then(() => history.push(routes.LOGIN));
                    }}>
                    Log Out
                  </button>
                </div>
                <div className="sidebar-items">

                  <UserChallengesList />
                </div>
              </div>
            </div>
          </nav>
        </header>
      );
    }}
  </Query>
);

export default Sidebar;
