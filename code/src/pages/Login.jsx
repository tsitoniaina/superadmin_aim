import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Container, Row, Col,Alert } from 'reactstrap';
import { createClient } from '@supabase/supabase-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import '../index.css';
import Config from '../../config';
import cardImage from '../assets/cardImage.jpg';

const project_id = Config.project_id;
const project_key = Config.project_key;
// const project_type = Config.project_type;

// Initialisation de Supabase
const supabase = createClient('https://' + project_id + '.supabase.co', project_key);

const Login = () => {
  const [mail, setUserMail] = useState('');
  const [password, setUserPass] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();
  // const [session, setSession] = useState(null);

  useEffect(() => {
    // Vérification de la session et redirection si l'utilisateur est connecté
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // setSession(session);
      if (session) {
        navigate('/dashboard'); // Redirection vers le tableau de bord si déjà connecté
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // setSession(session);
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: password,
      });

      if (error) {
        console.error('Erreur de connexion:', error.message);
        setAlertMessage(error.message || 'Erreur de connexion');
        setAlertType('danger');
      } else {
        console.log('Connexion réussie:', data);
        setAlertMessage('Connexion réussie ! Redirection vers le tableau de bord...');
        setAlertType('success');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setAlertMessage('Erreur de connexion. Veuillez réessayer.');
      setAlertType('danger');
    }
  };

  return (
    <div className="index-container d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="flex-row" style={{ width: '70rem' }}>
            <img
              src={cardImage}
              alt="Image"
              className="img-fluid"
              style={{ width: '50%', borderRadius: '8px 0 0 8px' }}
            />
            <CardBody>
              <CardTitle tag="h2" className="text-center">Connexion</CardTitle>

              {alertMessage && (
                <Alert color={alertType} className="mt-3">
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <Label for="email">Email:</Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <Input
                      type="email"
                      id="email"
                      value={mail}
                      onChange={(e) => setUserMail(e.target.value)}
                      required
                    />
                  </div>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="password">Mot de passe:</Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setUserPass(e.target.value)}
                      required
                    />
                  </div>
                </FormGroup>
                <Button color="primary" type="submit" className="w-100 mb-2">
                  <FontAwesomeIcon icon={faSignInAlt} /> Se connecter
                </Button>
              </Form>
              <p className="text-center">
                Pas encore inscrit ?
                <Button color="link" onClick={() => navigate('/')}>
                  S'inscrire
                </Button>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
