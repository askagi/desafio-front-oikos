import { createElement } from "react";
import { Col, Container, Modal, Row, Stack } from "react-bootstrap";
import { useAssets } from "../../hooks/useAssets";
import { priceFormatter } from "../../utils/formatter";

export function AssetsDetail(): any {
    const { assetsModal, setAssetsModal } = useAssets();
    function handleClose() {
        setAssetsModal({
            open: false,
        });
    }

    const openModal = assetsModal.open && assetsModal.target === "AssetsDetail"

    return openModal && createElement(() =>
        <Modal
            size="xl"
            show={assetsModal?.open}
            onHide={handleClose}
            centered
        >

            <Container fluid className="">
                <Modal.Header className="pt-4 px-0" closeButton >
                    <Modal.Title>Detalhamento do ativo</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    padding: "64px 0 84px 0"
                }}>
                    <Row className="justify-content-between">
                        <Col>
                            <Stack gap={3}>
                                <h6 className="fw-semibold">Nome da Empresa</h6>
                                <span
                                    className="text-center rounded badge-custom">
                                    {assetsModal.assets?.company}
                                </span>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack gap={3}>
                                <h6 className="fw-semibold">Identificador</h6>
                                <span
                                    className="text-center rounded badge-custom">
                                    {assetsModal.assets?.asset}
                                </span>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack gap={3}>
                                <h6 className="fw-semibold">Tipo do ativo</h6>
                                <span
                                    className="text-center rounded badge-custom badge-custom-color" >
                                    {assetsModal.assets?.type}
                                </span>
                            </Stack>
                        </Col>

                        {assetsModal.assets?.type === "acao" ?

                            <Col>
                                <Stack gap={3}>
                                    <h6 className="fw-semibold">Lote Padrão</h6>
                                    <span
                                        className="text-center rounded badge-custom">
                                        {assetsModal.assets?.additionalInfo.allotmentSize}
                                    </span>
                                </Stack>
                            </Col>



                            :

                            <Col>
                                <Stack gap={3}>
                                    <h6 className="fw-semibold">Tipo de opção</h6>
                                    <span
                                        className="text-center rounded badge-custom"                                    >
                                        {assetsModal.assets?.additionalInfo.operation}
                                    </span>
                                </Stack>
                            </Col>
                        }

                        <Col>
                            <Stack gap={3}>
                                <h6 className="fw-semibold">Valor por ação</h6>
                                <span
                                    className="text-center rounded badge-custom"                                >
                                    {priceFormatter.format(assetsModal.assets?.additionalInfo.unitPrice ?? 0)}
                                </span>
                            </Stack>
                        </Col>
                    </Row>
                </Modal.Body>
            </Container>

        </Modal>
    )
}