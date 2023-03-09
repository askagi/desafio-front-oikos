import { Badge, Card, Pagination, Table } from "react-bootstrap";
import { useAssets } from "../../hooks/useAssets";
import { Assets } from "../../hooks/useAssets/useAssetsProvider";
import { priceFormatter } from "../../utils/formatter";
import { AssetsDetail } from "../AssetsDetail";
import { DeleteAssetButton } from "../DeleteAssetButton";
import { UpdateAssetButton } from "../UpdateAssetButton";

export function AssetsTable() {
    const { assets, setAssetsModal } = useAssets();

    function handleOpenAssetsDetails(assets: Assets) {
        setAssetsModal({
            open: true,
            target: "AssetsDetail",
            assets
        })
    }

    return (
        <>
            <AssetsDetail />
            <Card border="0" style={{
                marginTop: "-5.55rem",
                padding: "3.6rem 5rem"
            }}>
                <Card.Body className="p-0">
                    <Card.Title
                        className="fw-semibold mb-5"
                        as="h4"
                    >
                        Posição consolidada dos ativos
                    </Card.Title>
                    <Table responsive="md">
                        <thead className="border-bottom border-2">
                            <tr>
                                <th>Empresa</th>
                                <th>Identificador</th>
                                <th>Tipo do ativo</th>
                                <th>Valor</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody style={{ fontWeight: 500 }}>
                            {assets.map(asset =>
                                <tr key={asset._id}

                                >
                                    <td className="fw-semibold text-primary" onClick={() => handleOpenAssetsDetails(asset)}>
                                        {asset.company}
                                    </td>
                                    <td className="" onClick={() => handleOpenAssetsDetails(asset)}>
                                        {asset.asset}
                                    </td>
                                    <td onClick={() => handleOpenAssetsDetails(asset)}>
                                        <Badge
                                            className=""
                                            bg=""
                                            text="dark"
                                            style={{ backgroundColor: "rgba(121, 223, 193, 0.3)" }}
                                        >
                                            {asset.type}
                                        </Badge>
                                    </td>
                                    <td onClick={() => handleOpenAssetsDetails(asset)}>
                                        {priceFormatter.format(asset.additionalInfo.unitPrice)}
                                    </td>
                                    <td align="right" className="text-primary">

                                        <UpdateAssetButton
                                            asset={asset}
                                        />
                                    </td>
                                    <td align="right" className="text-danger">
                                        <DeleteAssetButton
                                            asset={asset}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </Table>
                </Card.Body>
                <Pagination
                    className="justify-content-center"
                    size="sm"
                >
                    <Pagination.First />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Last />
                </Pagination>
            </Card>
        </>
    )
}