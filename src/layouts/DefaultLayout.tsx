import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { NavbarCustom } from "../components/NavbarCustom";

export function DefaultLayout() {
    return (
        <Container fluid className="min-vh-100 px-0 pb-5">
            <Container fluid className=" text-bg-dark pt-4" style={{
                height: "21.5rem"
            }}>
                <Container as="header" fluid className="col-11">

                    <NavbarCustom />
                    <Header />

                </Container>
            </Container>
            <Container as="main" fluid className="col-11" >

                <Outlet />

            </Container>
        </Container>
    )
}