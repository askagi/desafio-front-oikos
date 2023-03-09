import { Button, Nav, Navbar } from "react-bootstrap";
import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.svg";


export function NavbarCustom() {

    const navigate = useNavigate();

    function handleExit() {
        navigate('/')
    }
    return (
        <Navbar
            className="navbar-custom justify-content-between"
            bg="dark"
            variant="dark"
        >
            <Navbar.Brand>
                <img
                    src={logoImage}
                    width="190"
                    height="25"
                    alt="logo"
                />
            </Navbar.Brand>

            <Nav.Item>
                <Button
                    className="d-flex gap-2 text-decoration-none"
                    variant="link"
                    type="button"
                    onClick={handleExit}
                >
                    <BsBoxArrowRight
                        size={24}
                    />
                    <strong>Sair</strong>
                </Button>
            </Nav.Item>

        </Navbar>
    )
}