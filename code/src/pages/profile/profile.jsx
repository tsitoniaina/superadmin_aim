  import React, { useEffect, useState } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import { Card, CardBody, Button, Input, FormGroup, Form, Label, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
  import '../../index.css';
  import useApiProfile from '../../services/ApiProfile';
  import "../../assets/css/customStyle.css";
  import '../../App.css';
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
  import { useNavigate } from 'react-router-dom';

  const Profile = () => {
    const [userProfile, setUserProfile] = useState({
      'Nom': '',
      'Prénom': '',
      'Téléphone': '',
      'Type': '',
      'Adresse': '',
      'Ville': '',
      'Pays': '',
      'Code postal': '',
    });

    const [hoveredField, setHoveredField] = useState(null);
    const { getUserData, updateUserData } = useApiProfile();

    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const data = await getUserData();
          console.log('Données de l\'utilisateur:', data.data_user_perso);
          setUserProfile({
            Nom: data.data_user_perso.lastName || '',
            Prénom: data.data_user_perso.firstName || '',
            Téléphone: data.data_user_perso.tel || '',
            Type: data.data_user_perso.userType || '',
            Adresse: data.data_user_perso.address || '',
            Ville: data.data_user_perso.city || '',
            Pays: data.data_user_perso.country || '',
            "Code postal": data.data_user_perso.postalCode || '',
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
        lastName: userProfile.Nom, 
        firstName: userProfile.Prénom, 
        tel: userProfile.Téléphone, 
        userType: userProfile.Type,
        address: userProfile.Adresse, 
        city: userProfile.Ville,
        country: userProfile.Pays,
        postalCode: userProfile['Code postal'], 
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
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Button color="link" onClick={() => navigate('/dashboard')} className="p-0 me-2" style={{ fontSize: '1.5rem' }}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#4B0082' }} />
              </Button>
              <h2 className="text-center flex-grow-1" style={{ fontSize: '1.75rem', fontWeight: '600', color: '#4B0082' }}>
                Profil de l'utilisateur
              </h2>
            </div>
            <hr style={{ border: '1px solid #4B0082' }} />

            <Form>
              {Object.entries(userProfile).map(([key, value]) => (
                <FormGroup row key={key} style={{ fontSize: '1.1rem' }}>
                  <Label for={key} sm={3}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Label>
                  <Col sm={9}>
                    <Row>
                      <Col sm={10}>
                        <Input
                          className="form-control"
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

