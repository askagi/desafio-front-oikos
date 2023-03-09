import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsPlusSquare } from "react-icons/bs";
import * as yup from 'yup';
// import { yupResolver } from "@hookform/resolvers/yup";
import { pt } from 'yup-locales';
import { useAssets } from "../../hooks/useAssets";
import { priceFormatterInput } from "../../utils/formatter";

yup.setLocale(pt);

export function CreateAssetButton() {

    const { createAsset } = useAssets();
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

    const { register, watch, handleSubmit, setValue, reset, formState: { errors } } = useForm<NewAssetFormInputs>({
        // resolver: yupResolver(newAssetSchema),
    });

    function onSubmit(data: NewAssetFormInputs) {


        if (data.typeAsset === "acao") {
            createAsset({
                company: data.company,
                type: data.typeAsset,
                asset: data.asset,
                additionalInfo: {
                    allotmentSize: Number(data.allotmentSize),
                    unitPrice: Number(data.unitPrice.replace("R$", "").replace(",", ".").trim()),
                },

            })
        } else if (data.typeAsset === "opcao") {
            createAsset({
                company: data.company,
                type: data.typeAsset,
                asset: data.asset,
                additionalInfo: {
                    unitPrice: Number(data.unitPrice.replace("R$", "").replace(",", ".").trim()),
                    operation: data.operation,
                },

            })
        }

        handleClose();
    }


    return (
        <>
            <Button
                className="d-flex align-items-center justify-content-center gap-3 py-2 px-5"
                onClick={handleShow}
            >
                <BsPlusSquare
                    size={24}
                    color="#FFFFFF"
                />
                <span className="fw-semibold">
                    Cadastrar ativo
                </span>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton >
                    <Stack>
                        <Modal.Title>Cadastrar ativo</Modal.Title>
                        <span className="text-muted">Preencha as informações do ativo para cadastrar</span>
                    </Stack>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Floating className="mb-3" >
                                <Form.Control
                                    id="floatingCompany"
                                    placeholder="Nome da empresa*"
                                    autoFocus
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
                                    Cadastrar ativo
                                </span>
                            </Button>
                        </Stack>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}