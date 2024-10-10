import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Progress, Badge, CardText,Alert } from 'reactstrap';
import { useNavigate,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock, faCalendar, faMapMarkerAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import 'react-phone-input-2/lib/style.css'; 
import './Register.css';
import '../index.css';
import useApiProfile from '../services/ApiProfile';
import { useSearchParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Config from '../../config';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import icone from '../assets/icone.png';

const project_id = Config.project_id;
const project_key = Config.project_key;
const supabase = createClient('https://' + project_id + '.supabase.co', project_key);

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { updateUserData } = useApiProfile();
  const [searchParams] = useSearchParams();

  const { dom } = useParams();
  const { code } = useParams();


  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      mail: '', tel: '', userType: '',
      password: '',
      lastName: '', firstName: '', birthDate: '',
      address: '', postalCode: '', city: '', country: '',
      role: 'admin'
    };
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? JSON.parse(savedStep) : 0;
  });

  const [errors, setErrors] = useState({ email: '', age: '', tel: '' });
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateAge = (birthDate) => new Date().getFullYear() - new Date(birthDate).getFullYear() >= 18;
  const validatePhoneNumber = (phone) => /^\+?\d{10,}$/.test(phone);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('currentStep', JSON.stringify(currentStep));
  }, [formData, currentStep]);

  useEffect(() => {
    setErrors({
      email: formData.mail && !validateEmail(formData.mail) ? 'Adresse e-mail invalide' : '',
      age: formData.birthDate && !validateAge(formData.birthDate) ? 'Vous devez avoir au moins 18 ans.' : '',
      tel: formData.tel && !validatePhoneNumber(formData.tel) ? 'Numéro de téléphone invalide' : ''
    });

    const fetchCountries = async () => {
      const response = await fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code");
      const data = await response.json();
      setCountries(data.countries);
    };

    fetchCountries();
  }, [formData]);

  const nextStep = async () => {
    if (currentStep === 5) {
      const savedData = JSON.parse(localStorage.getItem('formData'));
      
      if (savedData) {
        try {
          const { mail, password, ...dataToUpdate } = savedData
          console.log( dataToUpdate);
          await updateUserData(dataToUpdate);
          
          console.log('Données utilisateur mises à jour avec succès');
          
        } catch (error) {
          console.error('Erreur lors de la mise à jour des données utilisateur:', error);
          return; 
        }
        localStorage.removeItem('formData'); 
      }
    }

    if (currentStep === 2 && (!formData.userType || errors.email || errors.tel)) return;
    if (currentStep === 1 && (!formData.lastName || !formData.firstName || errors.age)) return;
    
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => setCurrentStep(prev => prev - 1);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    if (selectedOption) {
      const updatedFormData = { ...formData, country: selectedOption.value };
      setFormData(updatedFormData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: formData.mail,
      password: formData.password,
      role: formData.role, 
      phone: formData.tel,
      userType: formData.userType,
      lastName: formData.lastName,
      firstName: formData.firstName,
      birthDate: formData.birthDate,
      address: formData.address,
      postalCode: formData.postalCode,
      city: formData.city,
      country: formData.country
    });

    if (error) {
      alert(error.message);
    } else {
      if (code) {
        try {
          const response = await fetch('https://jose-aim-api.dt5.natixgroup.com/add_child_with_referral', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              referral_code: code,
              child_email: formData.mail,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi des données.');
          }
  
          const data = await response.json();
          console.log('Réponse:', data);
        } catch (error) {
          console.error('Erreur:', error);
        }
      }
      setCurrentStep(2);  
    }
  };
  useEffect(() => {
    const step = searchParams.get('step');
    if (step) {
      setCurrentStep(parseInt(step, 10));  
    }
  }, [searchParams]);

  const handleBackClick = () => {
    localStorage.removeItem('formData'); 
    setCurrentStep(0);
  };

  const finalisation = () => {
    localStorage.removeItem('formData'); 
    localStorage.removeItem('currentStep');
    navigate('/dashboard');
  }
  return (
    <div className="index-container d-flex justify-content-center align-items-center vh-100">
      {code && 
        <Alert style={{ position: 'absolute',top: '0px',margin:'auto' }} className="alert-success">Félicitations vous avez un Parrain pour <a href="#" className="alert-link">AIM</a>.</Alert> 
      }
      <Card className="mt-5 w-100" style={{ maxWidth: '600px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-3">
              <Button color="link" onClick={handleBackClick} className="p-0 me-2" style={{ fontSize: '1.5rem' }}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#4B0082' }} />
              </Button>
              <CardTitle tag="h2" className="text-center flex-grow-1">Création de mon compte</CardTitle>
            </div>
          <Progress value={(currentStep / 6) * 100} className="mb-4" />
          <Form onSubmit={handleSubmit}>
          {currentStep === 0 && (
              <>
                <div className="text-center mb-3">
                <div className="row align-items-center justify-content-center mb-4">
                    <div className="col-auto">
                      <img 
                        src={icone}
                        alt="Axium Logo" 
                        className="logo" 
                        style={{
                          width: '8rem',
                          borderRadius: '50%',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                        }} 
                      />
                    </div>
                    <div className="col-auto" style={{
                      fontSize: '2rem', 
                      fontWeight: 'bold', 
                      letterSpacing: '0.1rem', 
                      color: '#000',
                      textTransform: 'uppercase'
                    }}>
                      <span style={{ color: '#4B0082' }}>A</span>XIOM
                    </div>
                  </div>
                  <h5>Prêt à démarrer ?</h5>
                  <p>Fais le premier pas pour rejoindre notre communauté exclusive.</p>
                </div>
                <Button 
                  color="primary" 
                  onClick={nextStep} 
                  className="w-100"
                >
                  Je commence mon inscription 🚀
                </Button>
                <p className="text-center">
                  Vous êtes déjà inscrit ? 
                  <button className="btn btn-link" onClick={() => navigate('/login')}>Se Connecter</button>
                </p>
              </>
            )}
            {currentStep === 1 && (
              <>
                {['mail', 'password'].map(field => (
                  <FormGroup key={field}>
                    <Label>{field === 'mail' ? 'Email' : 'Mot de passe'} <span className="text-danger">*</span></Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={field === 'mail' ? faEnvelope : faLock} />
                      </span>
                      <Input
                        type={field === 'password' ? 'password' : 'email'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={`Votre ${field === 'mail' ? 'email' : 'mot de passe'}`}
                        required
                      />
                    </div>
                  </FormGroup>
                ))}

                <div className="d-flex justify-content-between">
                  <Button color="secondary" onClick={previousStep} className="me-2 w-50">
                    Précédent
                  </Button>
                  <Button color="success" type="submit" className="w-50">S'inscrire</Button>
                </div>
              </>
            )}
            {currentStep === 2  && (
              <>
                <div className="text-center mb-3">
                  <h5>Vous y êtes presque</h5>
                  <p>Un e-mail de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception (et vos spams) pour activer votre compte.</p>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                {['firstName', 'lastName', 'birthDate'].map((field) => (
                  <FormGroup key={field}>
                    <Label>{field === 'firstName' ? 'Prénom' : field === 'lastName' ? 'Nom' : 'Date de naissance'} <span className="text-danger">*</span></Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={field === 'birthDate' ? faCalendar : faUser} />
                      </span>
                      <Input
                        type={field === 'birthDate' ? 'date' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field === 'birthDate' ? undefined : `Votre ${field === 'firstName' ? 'prénom' : 'nom'}`}
                        required
                        className={field === 'birthDate' && errors.age ? 'is-invalid' : ''}
                      />
                    </div>
                    {field === 'birthDate' && errors.age && <small className="text-danger">{errors.age}</small>}
                  </FormGroup>
                ))}
                <div className="d-flex justify-content-between">
                  <Button color="secondary" onClick={previousStep} className="me-2 w-50">
                    Précédent
                  </Button>
                  <Button color="primary" onClick={nextStep} className="w-50" disabled={!!errors.age}>
                    Suivant
                  </Button>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <FormGroup>
                  <Label>Type d'utilisateur</Label>
                  <div className="d-flex justify-content-between">
                    {['Particulier', 'Entreprise'].map(type => (
                      <Badge
                        key={type}
                        pill
                        color={formData.userType === type ? 'primary' : 'secondary'}
                        onClick={() => setFormData(prev => ({ ...prev, userType: type }))}
                        className={`w-100 me-2 ${formData.userType === type ? 'badge-selected' : ''}`}
                        style={{ cursor: 'pointer', padding: '10px', textAlign: 'center' }}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </FormGroup>
                {['tel', 'pseudo'].map(field => (
                  <FormGroup key={field}>
                    <Label>{field === 'tel' ? 'Téléphone' : 'Pseudo'} <span className="text-danger">*</span></Label>
                    <div className="input-group">
                      {field === 'tel' ? (
                        <PhoneInput
                          country={'fr'}
                          value={formData.tel}
                          onChange={(value) => handleChange({ target: { name: 'tel', value } })}
                          placeholder="Entrez votre numéro de téléphone"
                          inputStyle={{ width: '100%' }}
                          containerClass="w-100"
                          className={errors.tel ? 'is-invalid' : ''}
                          required
                        />
                      ) : (
                        <Input
                          type="pseudo"
                          name="pseudo"
                          value={formData.pseudo}
                          onChange={handleChange}
                          placeholder="Entrez votre pseudo"
                          className={errors.pseudo ? 'is-invalid' : ''}
                          required
                        />
                      )}
                    </div>
                    {field === 'tel' && errors.tel && <small className="text-danger">{errors.tel}</small>}
                  </FormGroup>
                ))}
                <div className="d-flex justify-content-between">
                  <Button color="secondary" onClick={previousStep} className="me-2 w-50">
                    Précédent
                  </Button>
                  <Button color="primary" onClick={nextStep} className="w-50" disabled={!!errors.age}>
                    Suivant
                  </Button>
                </div>
              </>
            )}

             {currentStep === 5 && (
              <>
                {['address', 'postalCode', 'city'].map(field => (
                  <FormGroup key={field}>
                    <Label>{field === 'address' ? 'Adresse complète' : field === 'postalCode' ? 'Code Postal' : 'Ville'} <span className="text-danger">*</span></Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={field === 'address' ? faHome : faMapMarkerAlt} />
                      </span>
                      <Input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={`Votre ${field === 'postalCode' ? 'code postal' : field === 'city' ? 'ville' : 'adresse'}`}
                        required
                      />
                    </div>
                  </FormGroup>
                ))}
                <FormGroup>
                  <Label>Pays <span className="text-danger">*</span></Label>
                  <Select
                    name='country'
                    options={countries}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    placeholder="Sélectionnez votre pays"
                    required
                  />
                </FormGroup>
                <div className="d-flex justify-content-between">
                  <Button color="secondary" onClick={previousStep} className="me-2 w-50">
                    Précédent
                  </Button>
                  <Button color="primary" onClick={nextStep} className="w-50">
                    Suivant
                  </Button>  
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <Card className="text-center" style={{margin: '0 auto', maxWidth: '500px' }}>
                  <CardBody>
                    <CardTitle tag="h4">Confirmation de Compte</CardTitle>
                    <CardText>
                      Votre compte a été créé avec succès ! 🎉<br />
                      Vous pouvez maintenant vous connecter et profiter de nos services.
                    </CardText>
                    <Button color="primary" onClick={finalisation}>
                      finaliser
                    </Button>
                  </CardBody>
                </Card>
              </>
            )}
          </Form>
          <div className="text-center mt-4">
            <hr />
            <small className="text-muted d-block mt-2">Ou inscrivez-vous avec Google</small>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;
