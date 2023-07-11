import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, Outlet } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  const onClickHandle = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        <Navbar expand="lg" className="bg-body-tertiary">
          <div>
            <Container>
              <Navbar.Brand
                onClick={() => onClickHandle("/")}
                className="navbar-title"
              >
                Home
              </Navbar.Brand>
              <Navbar.Brand
                onClick={() => onClickHandle("/employee")}
                className="navbar-title"
              >
                Employee
              </Navbar.Brand>
            </Container>
          </div>
        </Navbar>
        <Outlet />
      </div>
    </>
  );
}

export default NavigationBar;
