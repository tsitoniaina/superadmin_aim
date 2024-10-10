import React from 'react';
import MatrixContainer from './MatrixContainer';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import {Button, CardBody ,Row, Col} from 'reactstrap';

const MatrixPage = () => {

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
                <div className='row'>
                    <div className="d-flex justify-content-center">
                      <div className="w-100" style={{ borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', backgroundColor: '#f8f9fa' }}>
                        <container>
                          <Row>
                            <Col sm="6">
                              <CardBody>
                              </CardBody>
                            </Col>
                            <Col sm="6">
                              <CardBody>
                              </CardBody>
                            </Col>
                          </Row>
                        </container>
                      </div>
                      <div className="w-100" style={{ borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', backgroundColor: '#f8f9fa' }}>
                          <CardBody>
                          <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#4B0082' }}>Matrix Simulation</h2>
                          </div>
                          <hr style={{ border: '1px solid #4B0082' }} />
                          <MatrixContainer></MatrixContainer>
                          </CardBody>
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

export default MatrixPage;