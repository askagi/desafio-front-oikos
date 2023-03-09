import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { priceFormatter, priceFormatterInput } from "../../utils/formatter";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pt } from 'yup-locales';
import { useAssets } from "../../hooks/useAssets";
import { Assets, UpdateAssetInput } from "../../hooks/useAssets/useAssetsProvider";
import { BsPencilSquare } from "react-icons/bs";

yup.setLocale(pt);

interface Props {
    asset: UpdateAssetInput;
}

export function UpdateAssetButton({ asset }: Props) {

    const { updateAsset, assetsModal } = useAssets();
    const [show, setShow] = useState(false);

    function handleClose() {
        reset()
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    };



    const newAssetSchema = yup.object({
        company: yup.string().required('Campo obrigatório'),
        asset: yup.string().required('Campo obrigatório'),
        typeAsset: yup.string().required('Campo obrigatório'),
        allotmentSize: yup.number().required('Campo obrigatório'),
        operation: yup.string().required('Campo obrigatório'),
        unitPrice: yup.string().required('Campo obrigatório'),
    });

    type NewAssetFormInputs = yup.InferType<typeof newAssetSchema>

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        reset } = useForm<NewAssetFormInputs>({});

    function handleSetValue() {
        setValue("company", asset.company);
        setValue("asset", asset.company);
        setValue("typeAsset", asset.type);
        setValue("allotmentSize", Number(asset.additionalInfo.allotmentSize));
        setValue("operation", String(asset.additionalInfo.operation));
        setValue("unitPrice", priceFormatter.format(asset.additionalInfo.unitPrice));
    }

    function onSubmit(data: NewAssetFormInputs) {

        if (data.typeAsset === "acao") {
            updateAsset({
                _id: asset._id,
                company: data.company,
                type: data.typeAsset,
                asset: data.asset,
                additionalInfo: {
                    allotmentSize: Number(data.allotmentSize),
                    unitPrice: Number(data.unitPrice.replace("R$", "").replace(",", ".").trim()),
                },

            })
        } else if (data.typeAsset === "opcao") {
            updateAsset({
                _id: asset._id,
                company: data.company,
                type: data.typeAsset,
                asset: data.asset,
                additionalInfo: {
                    unitPrice: Number(data.unitPrice.replace("R$", "").replace(",", ".").trim()),
                    operation: data.operation,
                },

            })
        }

        handleClose()
    }

    useEffect(() => {
        handleSetValue()
    }, [])

    return (
        <>
            <Button
                variant="link"
                className="p-0 text-decoration-none d-flex align-items-center btn-edit"
                onClick={handleShow}
            >
                <BsPencilSquare
                    size={18}
                />
                <span className="ps-2">Editar</span>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton >
                    <Stack>
                        <Modal.Title>Editar ativo</Modal.Title>
                        <span className="text-muted">Preencha as informações para editar o ativo</span>
                    </Stack>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingCompany"
                                    placeholder="Nome da empresa*"
                                    autoFocus
                                    disabled
                                    {...register("company")}
                                />
                                <Form.Label htmlFor="floatingCompany">Nome da empresa*</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        <Form.Group>
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="floatingAsset"
                                    placeholder="Identificador*"
                                    disabled
                                    {...register("asset")}
                                />
                                <Form.Label htmlFor="floatingAsset">Identificador*</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        <Form.Group>
                            <Form.Floating className="mb-3">
                                <Form.Select
                                    aria-label="Floating label select"
                                    id="floatingTypeAsset"
                                    disabled
                                    {...register("typeAsset")}
                                >
                                    <option value="">Selecione o tipo do ativo</option>
                                    <option value="acao">Ação</option>
                                    <option value="opcao">Opção</option>
                                </Form.Select>
                                <Form.Label htmlFor="floatingTypeAsset">Tipo do ativo*</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        {/* Se o tipo for Acao */}
                        {watch("typeAsset") === "acao" ?
                            <Form.Group>
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        type="number"
                                        id="floatingAllotmentSize"
                                        placeholder="Lote Padrão*"
                                        {...register("allotmentSize")}
                                    />
                                    <Form.Label htmlFor="floatingAllotmentSize">Lote Padrão*</Form.Label>
                                </Form.Floating>
                            </Form.Group>

                            :

                            <Form.Group >
                                <Form.Floating className="mb-3">
                                    <Form.Select
                                        aria-label="Floating label select"
                                        id="floatingOperation"
                                        disabled
                                        {...register("operation")}
                                    >
                                        <option value="">Selecione o tipo da opção</option>
                                        <option value="compra">Compra</option>
                                        <option value="venda">Venda</option>
                                    </Form.Select>
                                    <Form.Label htmlFor="floatingOperation">Tipo de opção*</Form.Label>
                                </Form.Floating>
                            </Form.Group>
                        }

                        <Form.Group >
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    // isValid
                                    // isInvalid
                                    id="floatingUnitPrice"
                                    placeholder="Valor por ação*"
                                    {...register('unitPrice', {
                                        // valueAsNumber: true,
                                        onChange({ target }) {
                                            setValue("unitPrice", "R$ " + priceFormatterInput(target.value))
                                        },
                                    })}
                                />
                                <Form.Label htmlFor="Identificador">Valor por ação*</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        <Stack className="d-flex justify-content-end" direction="horizontal" gap={3}>
                            <Button
                                className="py-2 px-4"
                                variant="outline-secondary"
                                onClick={handleClose}
                            >
                                <span className="fw-semibold">
                                    Cancelar
                                </span>
                            </Button>
                            <Button
                                className="py-2 px-4"
                                variant="primary"
                                type="submit"
                            >
                                <span className="fw-semibold">
                                    Salvar edição
                                </span>
                            </Button>
                        </Stack>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}