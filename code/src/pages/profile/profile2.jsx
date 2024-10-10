import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, Button, Input, FormGroup, Form, Label, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../index.css';
import useApiProfile from '../../services/ApiProfile';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import "../../assets/css/customStyle.css";
import '../../App.css';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    'Nom': '',
    'Prénom': '',
    'Téléphone': '',
    'Type d\'utilisateur': 'Particulier',
    'Adresse': '',
    'Ville': '',
    'Pays': 'France',
    'Code postal': '',
  });

  const [hoveredField, setHoveredField] = useState(null);
  const { getUserData, updateUserData } = useApiProfile();

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        console.log('Données de l\'utilisateur:', data.data_user_perso);
        setUserProfile({
          lastname: data.data_user_perso.last_name || '',
          firstname: data.data_user_perso.first_name || '',
          phone: data.data_user_perso.phone || '',
          address: data.data_user_perso.address || '',
          city: data.data_user_perso.city || '',
          zip: data.data_user_perso.zip || '',
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchUserData();
  }, [getUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changement de champ: ${name} = ${value}`);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const updatedUserData = {
      last_name: userProfile.lastname,
      first_name: userProfile.firstname,
      phone: userProfile.phone,
      userType: userProfile.userType,
      address: userProfile.address,
      city: userProfile.city,
      zip: userProfile.zip,
    };

    console.log('Mise à jour des données utilisateur:', updatedUserData);

    try {
      const response = await updateUserData(updatedUserData);
      console.log('User updated successfully:', response);
      setSuccessModal(true); 
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorModal(true); 
    }
  };

  const toggleSuccessModal = () => setSuccessModal(!successModal);
  const toggleErrorModal = () => setErrorModal(!errorModal);

  return (
    <div className="index-container d-flex justify-content-center align-items-center vh-100">
      <Card className="mt-5 w-100" style={{ maxWidth: '600px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <CardBody>
        <h2 className="mb-4 text-center" style={{ fontSize: '1.75rem', fontWeight: '600', color: '#4B0082' }}>Profil de l'utilisateur</h2>
        <hr style={{ border: '1px solid #4B0082' }} />
        <Form>
          {Object.entries(userProfile).map(([key, value]) => (
            <FormGroup row key={key} style={{ fontSize: '1.1rem' }}>
              <Label for={key} sm={2}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Label>
              <Col sm={10}>
                <Row>
                  <Col sm={10}>
                    <Input
                      className="form-control "
                      type="text"
                      name={key}
                      id={key}
                      value={value}
                      onChange={handleChange}
                      onMouseEnter={() => setHoveredField(key)}
                      onMouseLeave={() => setHoveredField(null)}
                    />
                  </Col>
                  <Col sm={2} className="d-flex align-items-center"> 
                    {hoveredField === key && (
                      <FontAwesomeIcon icon={faEdit} style={{ marginLeft: '5px', cursor: 'pointer' }} />
                    )}
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          ))}
        </Form>

          <Button
            color="primary"
            className="w-100"
            style={{ padding: '0.75rem', fontSize: '1.1rem', fontWeight: '500' }}
            onClick={handleUpdate}
          >
            <span className="ms-2">Enregistrer</span>
          </Button>

          <Modal isOpen={successModal} toggle={toggleSuccessModal}>
            <ModalHeader toggle={toggleSuccessModal}>Succès</ModalHeader>
            <ModalBody>
              Les données de l'utilisateur ont été mises à jour avec succès !
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleSuccessModal}>OK</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={errorModal} toggle={toggleErrorModal}>
            <ModalHeader toggle={toggleErrorModal}>Erreur</ModalHeader>
            <ModalBody>
              Une erreur s'est produite lors de la mise à jour des données utilisateur.
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={toggleErrorModal}>Fermer</Button>
            </ModalFooter>
          </Modal>
        </CardBody>
        </Card>
    </div>
  );
};

export default Profile;


