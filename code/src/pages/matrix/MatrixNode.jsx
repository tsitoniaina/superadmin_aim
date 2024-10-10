// src/components/MatrixNode.js
// eslint-disable-next-line no-unused-vars
import React, { useState, memo } from 'react';
import '../../assets/css/MatrixNode.css';
import PropTypes from 'prop-types';

const MatrixNode = memo(({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (user && user.children && user.children.length > 0) {
      setIsExpanded(!isExpanded);
    }
  };

  if (!user) {
    return null; 
  }

  return (
    <div className="matrix-node">
      <div
        className={`matrix-item level-${user.level} ${user.user === 'Empty' ? 'empty' : ''}`}
        onClick={toggleExpand}
      >
        <div className="user-info">
          <p>{user.user !== 'Empty' ? user.user : ''}</p>
          {user.user !== 'Empty' && (
            <span className="gmd-flag" title="Level">{`Level: ${user.level}`}</span>
          )}
        </div>
        {user.children && user.children.length > 0 && user.user !== 'Empty' && (
          <button className="toggle-button">
            {isExpanded ? '↓' : '→'}
          </button>
        )}
      </div>
      {isExpanded && user.children && user.children.length > 0 && (
        <div className="matrix-children">
          {user.children.map((child, index) => (
            <MatrixNode
              key={index}
              user={child}
            />
          ))}
        </div>
      )}
    </div>
  );
});

MatrixNode.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default MatrixNode;
