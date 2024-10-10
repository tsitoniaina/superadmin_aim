import React from 'react';
import MatrixNode from './MatrixNode';
import '../../assets/css/Matrix.css';
import PropTypes from 'prop-types';

function Matrix({ matrixId, rootUser }) {
  return (
    <div className="matrix">
      <div className="level-banner">M{matrixId}</div>
      <div className="matrix-tree">
        <MatrixNode user={rootUser} />
      </div>
    </div>
  );
}

Matrix.propTypes = {
  matrixId: PropTypes.string.isRequired, 
  rootUser: PropTypes.shape({
    user: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default Matrix;
