import React, { useEffect, useState } from 'react';
import { getMatrices } from '../../services/ApiListMatrix';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom'; 

const ListeMatrix = () => {
  const [matrices, setMatrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatrices = async () => {
    try {
      const data = await getMatrices(); 
      setMatrices(data); 
      setLoading(false); 
    } catch (err) {
      setError('Failed to fetch matrices');
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMatrices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <div className="index-container app-sidebar sidebar-shadow">
            <div className="row justify-content-center mb-4">
              <Sidebar />
            </div>
          </div>
          <div className="app-main__outer">
            <div className="index-container">
              <div className="py-1"></div>
            </div>
            <div className="app-main__inner">
              <div className="row">
                <div className="d-flex justify-content-center">
                  <div
                    className="w-100"
                    style={{
                      borderRadius: '15px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      backgroundColor: '#f8f9fa',
                    }}
                  >
                    <div className="container">
                      <Row>
                        <div style={{ textAlign: 'center' }}>
                          <h2
                            style={{
                              fontSize: '1.75rem',
                              fontWeight: '600',
                              color: '#4B0082',
                            }}
                          >
                            Listes Matrix
                          </h2>
                        </div>
                      </Row>
                      <Row>
                        {matrices.map((matrix) => (
                          <Col sm="6" key={matrix.id} className="mb-4">
                            <Card>
                              <CardBody>
                                <h5>{matrix.name}</h5>
                                <p>
                                  <strong>Pack Name:</strong> {matrix.packName} <br />
                                  <strong>Pack Price:</strong> ${matrix.packPrice} <br />
                                  <strong>Pack Description:</strong> {matrix.packDescription} <br />
                                  <strong>Pack Trigger:</strong> {matrix.packTrigger || "None"} <br />
                                  <strong>Created At:</strong> {new Date(matrix.createdAt).toLocaleDateString()} <br />
                                </p>
                              </CardBody>
                              <div className="d-flex justify-content-end p-2">
                                <Link to={`/matrices/${matrix.id}/edit`}>
                                  <FontAwesomeIcon icon={faPen} size="lg" style={{ color: '#4B0082' }} />
                                </Link>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListeMatrix;
