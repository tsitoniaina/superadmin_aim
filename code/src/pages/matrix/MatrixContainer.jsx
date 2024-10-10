import React, { useState, useEffect } from 'react';
import Matrix from './Matrix.jsx';
import '../../assets/css/MatrixContainer.css';

const MatrixContainer = () => {
  const [matrices, setMatrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatrices = async () => {
      try {
        const response = await fetch('https://jose-aim-api.dt5.natixgroup.com/usermatrices/hierarchy');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des matrices.');
        }
        const data = await response.json();
        setMatrices(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des matrices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatrices();
  }, []);

  return (
    <div className="matrix-container">
      <div className="matrices-stack">
        {loading ? (
          <i className="fas fa-spinner fa-pulse"></i>
        ) : Object.keys(matrices).length === 0 ? (
          <p>Aucune matrice disponible.</p>
        ) : (
          Object.keys(matrices).map((matrixName) => {
            const matrix = matrices[matrixName];
            if (!matrix || matrix.length === 0) {
              return null; 
            }
            return (
              <div key={matrixName} className="matrix-group">
                <h2 className='text-center'>{matrixName}</h2>
                {matrix.map((matrixItem, index) => (
                  <Matrix
                    key={`${matrixName}-${index}`}
                    matrixId={matrixName}
                    rootUser={matrixItem}
                  />
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MatrixContainer;
