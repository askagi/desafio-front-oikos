import { Button, Container, Form } from "react-bootstrap";
import { BsChevronCompactLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { LoginHeader } from "./LoginHeader";

interface Props {
    onBackStep: () => void;
}

export function ValidateStep({ onBackStep }: Props) {

    const navigate = useNavigate();
    function handleValidateData(e: any) {
        e.preventDefault();
        navigate('/dashboard');
    }

    return (
        <Container className="vh-100 pt-5 px-5">
            <div className="">
                <Button
                    className="fw-semibold text-decoration-none d-flex align-items-center gap-1"
                    variant="link"
                    onClick={onBackStep}
                >
                    <BsChevronCompactLeft
                        width={24}
                        height={24}
                        color="#0d6efd"
                    />
                    <span>Voltar para Login</span>
                </Button>
            </div>
            <Container className="col-md-10 h-75 col-xxl-6 d-flex flex-column justify-content-center align-items-center">
                <LoginHeader
                    title="Valide seu acesso inserido o código"
                    subtitle="Enviamos um código para seu email"
                />

                <Form className="col-md-11" onSubmit={handleValidateData}>
                    <Form.Group className="d-flex gap-4" >
                        <Form.Control
                            className="w-25"
                            size="lg"
                            type="text"
                            maxLength={1}
                            style={{
                                textAlign: 'center'
                            }}
                        />
                        <Form.Control
                            className="w-25"
                            size="lg"
                            type="text"
                            maxLength={1}
                            style={{
                                textAlign: 'center'
                            }}
                        />
                        <Form.Control
                            className="w-25"
                            size="lg"
                            type="text"
                            maxLength={1}
                            style={{
                                textAlign: 'center'
                            }}
                        />
                        <Form.Control
                            className="w-25"
                            size="lg"
                            type="text"
                            maxLength={1}
                            style={{
                                textAlign: 'center'
                            }}
                        />
                        <Form.Control
                            className="w-25"
                            size="lg"
                            type="text"
                            maxLength={1}
                            style={{
                                textAlign: 'center'
                            }}
                        />
                    </Form.Group>
                    <Form.Text className="d-flex justify-content-center mt-3" muted>
                        O código é válido por 5 minutos
                    </Form.Text>

                    <Button
                        size="lg"
                        className="w-100 mt-5"
                        variant="primary"
                        type="submit"
                    >
                        Entrar
                    </Button>
                </Form>
            </Container>


        </Container>
    )
}