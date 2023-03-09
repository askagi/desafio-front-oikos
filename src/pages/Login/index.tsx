import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import logoImg from "../../assets/logo.svg";
import { LoginForm } from "./Components/LoginForm";
import { ValidateStep } from "./Components/ValidateStep";

export function Login() {
    const [validationStap, setValidationStap] = useState(false);

    function handleBackStep() {
        setValidationStap(false);
    }

    function handleNextStep() {
        setValidationStap(true);
    }

    return (
        <Container fluid>
            <Row className="vh-100">
                <Col className="bg-dark d-flex justify-content-center align-items-center">
                    <img src={logoImg}
                        width={244.77}
                        height={32.13}
                        alt="logo" />
                </Col>
                <Col>
                    {validationStap ?

                        <ValidateStep
                            onBackStep={handleBackStep}
                        />

                        :
                        <LoginForm
                            onNextStep={handleNextStep}
                        />
                    }
                </Col>
            </Row>
        </Container>
    )
}