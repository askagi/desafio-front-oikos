import { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { useAssets } from "../../hooks/useAssets";
import { BsExclamationTriangleFill, BsTrash } from "react-icons/bs";
import "./styles.scss"
import { Assets } from "../../hooks/useAssets/useAssetsProvider";

interface Props {
    asset: Assets;
}

export function DeleteAssetButton({ asset }: Props) {

    const { deleteAsset } = useAssets();
    const [show, setShow] = useState(false);

    function handleClose() {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    };

    function handleDeleteAsset(assetId: string) {
        deleteAsset(assetId);
        handleClose();
    }

    return (
        <>
            <Button
                variant="link"
                className="p-0 text-decoration-none d-flex align-items-center btn-delete"
                onClick={handleShow}
            >
                <BsTrash
                    size={18}
                />
                <span className="ps-2 py-0 text-danger">Excluir</span>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                className="modal-dialog-alert-custom"
            >
                <Modal.Header closeButton className="border-danger">
                    <Stack direction="horizontal" gap={2}>
                        <div className="alert-icon-container">
                            <BsExclamationTriangleFill size={24} />
                        </div>
                        <Modal.Title className="fw-bold">Deletar ativo?</Modal.Title>
                    </Stack>
                </Modal.Header>
                <Modal.Body className="space-custom">
                    <span>
                        Tem certeza que deseja excluir o ativo de identificador <strong>{asset.asset}?</strong>
                    </span>
                    <br />
                    <strong>Essa ação não poderá ser desfeita.</strong>

                </Modal.Body>
                <Stack className="d-flex justify-content-end mb-4" direction="horizontal" gap={3}>
                    <Button
                        size="sm"
                        className="py-2 px-4"
                        variant="outline-secondary"
                        onClick={handleClose}
                    >
                        <span className="fw-semibold">
                            Cancelar
                        </span>
                    </Button>
                    <Button
                        size="sm"
                        className="py-2 px-5"
                        variant="danger"
                        type="submit"
                        onClick={() => handleDeleteAsset(asset._id)}
                    >
                        <span className="fw-semibold">
                            Excluir ativo
                        </span>
                    </Button>
                </Stack>
            </Modal>
        </>
    )
}