import { Container, Stack } from "react-bootstrap";
import { CreateAssetButton } from "../CreateAssetButton";

export function Header() {
    return (
        <Container fluid className="p-0 pt-5 d-flex align-items-center header-custon">
            <Stack as="span">
                <h1 className="header-username">Olá, Tiago</h1>
                <span className="header-description">Este é seu Dashboard de ativos</span>
            </Stack>
            <CreateAssetButton />
        </Container>
    )
}