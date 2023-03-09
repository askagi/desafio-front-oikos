import { Button, Container, Form } from "react-bootstrap";
import { LoginHeader } from "./LoginHeader";

interface Props {
    onNextStep: () => void;
}

export function LoginForm({ onNextStep }: Props) {

    function handlelogin(e: any) {
        e.preventDefault();
        onNextStep();
    }
    return (
        <Container className="col-md-9 vh-100 col-xxl-6 d-flex flex-column justify-content-center">

            <LoginHeader
                title="Faça o Login para acessar sua conta"
                subtitle="Informe seu email e senha"
            />
            <Form onSubmit={handlelogin} className="col-md-11">

                <Form.Group className="mb-4" >
                    <Form.Control
                        size="lg"
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                </Form.Group>

                <Form.Group className="mb-4" >
                    <Form.Control
                        size="lg"
                        name="password"
                        type="password"
                        placeholder="Senha"
                    />
                </Form.Group>

                <Button
                    size="lg"
                    className="w-100"
                    variant="primary"
                    type="submit"
                >
                    Entrar
                </Button>
            </Form>
        </Container>
    )
}