import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getMatrixById, updateMatrix } from '../../services/ApiListMatrix';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const EditMatrix = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [matrix, setMatrix] = useState({
    name: '',
    packName: '',
    packPrice: '',
    packDescription: '',
    packTrigger: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatrix = async () => {
      try {
        const data = await getMatrixById(id);
        setMatrix(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch matrix details');
        setLoading(false);
      }
    };

    fetchMatrix();
  }, [id]);

  const handleChange = (e) => {
    setMatrix({
      ...matrix,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMatrix(id, matrix); 
      alert('Matrix updated successfully!');
      navigate('/matrix-list'); 
    } catch (err) {
      console.error('Error updating matrix:', err);
      alert('Failed to update matrix');
    }
  };

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
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <Card className="mt-4">
                    <CardBody>
                      <h3>Edit Matrix</h3>
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label for="name">Matrix Name</Label>
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            value={matrix.name}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="packName">Pack Name</Label>
                          <Input
                            type="text"
                            name="packName"
                            id="packName"
                            value={matrix.packName}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="packPrice">Pack Price</Label>
                          <Input
                            type="number"
                            name="packPrice"
                            id="packPrice"
                            value={matrix.packPrice}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="packDescription">Pack Description</Label>
                          <Input
                            type="textarea"
                            name="packDescription"
                            id="packDescription"
                            value={matrix.packDescription}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="packTrigger">Pack Trigger</Label>
                          <Input
                            type="text"
                            name="packTrigger"
                            id="packTrigger"
                            value={matrix.packTrigger || ''}
                            onChange={handleChange}
                          />
                        </FormGroup>
                        <Button type="submit" color="primary">
                          Update Matrix
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EditMatrix;
