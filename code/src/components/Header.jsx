import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function Header() {
  return (
    <div className="app-header header-shadow index-container">
      <div className="app-header__logo">
        <div className="col-auto">
          <img 
            src="icone.png" 
            alt="Axium Logo" 
            className="logo" 
            style={{
              width: '3rem',
              borderRadius: '50%',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s ease', 
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
              data-class="closed-sidebar"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div className="app-header__menu">
        <span>
          <button
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <FontAwesomeIcon icon={faCog} />
            </span>
          </button>
        </span>
      </div>
      <div className="app-header__content">
        <div className="app-header-left">
          <div className="search-wrapper">
            <div className="input-holder">
              <input type="text" className="search-input" placeholder="Type to search" />
              <button className="search-icon"><span></span></button>
            </div>
            <button className="close"></button>
          </div>
        </div>
        <div className="app-header-right">
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="btn-group">
                    <a
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="p-0 btn"
                    >
                      <img
                        width="42"
                        className="rounded-circle"
                        src="assets/images/avatars/1.jpg"
                        alt=""
                      />
                      <i className="fa fa-angle-down ml-2 opacity-8"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <button type="button" className="dropdown-item">User Account</button>
                      <button type="button" className="dropdown-item">Settings</button>
                      <h6 className="dropdown-header">Header</h6>
                      <button type="button" className="dropdown-item">Actions</button>
                      <div className="dropdown-divider"></div>
                      <button type="button" className="dropdown-item">Dividers</button>
                    </div>
                  </div>
                </div>
                <div className="widget-content-left ml-3 header-user-info">
                  <div className="widget-heading">Paramètre</div>
                </div>
                <div className="widget-content-right header-user-info ml-3">
                  <button type="button" className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                    {/* <i className="fa text-white fa-calendar pr-1 pl-1"></i> */}
                    <FontAwesomeIcon icon={faCog} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;