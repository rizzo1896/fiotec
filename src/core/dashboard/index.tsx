import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user_icon.png";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;
  return (
    <>
      <div>
        {/* Navbar do Topo */}
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand
              onClick={() => {
                navigate("/projetos-destaque");
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={logo} className="d-inline-block align-top" alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ms-4">
                <Nav.Link
                  onClick={() => {
                    navigate("/projetos-destaque");
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/projetos-destaque");
                  }}
                >
                  Projetos em Destaque
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/favoritos");
                  }}
                >
                  Meus Favoritos
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link
                  className="rounded-5"
                  style={{
                    backgroundColor: "#CCC",
                  }}
                >
                  <div
                    style={{
                      width: 25,
                      height: 25,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={user}
                      className="d-inline-block align-top"
                      alt="user"
                      width="20px"
                      height="20px"
                    />
                  </div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Layout Principal */}
        <Container fluid className="mt-5">
          <Row>
            {/* Navbar Lateral */}
            {pathname !== "/favoritos" ? (
              <Col
                md={2}
                className="bg-body-secondary mx-5 p-3 rounded-1 shadow-sm"
                style={{
                  maxHeight: "calc(100vh - 100px)",
                }}
              >
                <h5 style={{ fontWeight: 700 }}>Filtrar por categoria</h5>

                <Nav
                  activeKey="/"
                  onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                  className="flex-column"
                >
                  <Nav.Item>
                    <Nav.Link href="/" className="px-0 text-body">
                      Todos
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="px-0 text-body">Ensino</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="px-0 text-body">Pesquisa</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="px-0 text-body">
                      Estímulo à Inovação
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="px-0 text-body">Extensão</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="px-0 text-body">
                      Desenvolvimento Institucional
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="px-0 text-body">
                      Desenvolvimento Científico e Tecnológico
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            ) : null}

            {/* Conteúdo Principal */}
            <Col md={8} className="ps-0" style={{}}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
