import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthenticate } from "./Authenticate";

function BOLogIn() {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const authenticate = useAuthenticate();
  const navigate = useNavigate();
  const location = useLocation();

  const changePath = location.state?.path || "/";

  const adminLogin = () => {
    authenticate.login(admin);
    authenticate.login(password);
    navigate(changePath, { replace: true });
  };

  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <Button variant="light">
          <Link to={`/`}>
            Oj, jag kom fel. <br />
            Ta mig tillbaka till startsidan
          </Link>
        </Button>
        <h2>Logga in</h2>
      </div>

      <form className="admin-login">
        <label>Användarnamn</label>
        <input type="text" onChange={(e) => setAdmin(e.target.value)} />
        <label>Lösenord</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="primary" onClick={adminLogin}>
          Logga in
        </Button>
      </form>
    </Container>
  );
}

export default BOLogIn;
