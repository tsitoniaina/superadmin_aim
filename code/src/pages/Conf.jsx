import { useNavigate } from 'react-router-dom';
import { Container, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const Conf = () => {
  const navigate = useNavigate();

  // const handleLoginRedirect = () => {
  //   navigate('/login'); 
  // };
  const handleLoginRedirect = () => {
    navigate('/register?step=3'); 
  };
  

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center" style={{ maxWidth: '500px' }}>
        <CardBody>
          <CardTitle tag="h4">Confirmation de Compte</CardTitle>
          <CardText>
            Votre compte a été verifier avec succès ! 🎉<br />
            Vous pouvez maintenant confinuer votre inscription
          </CardText>
          <Button color="primary" onClick={handleLoginRedirect}>
            continuer mon inscription
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Conf;
