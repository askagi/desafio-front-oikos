import { useState } from "react";
import { toast } from "react-toastify";
import { assetsData } from "../../data/assetsData";
import { api } from "../../services/api";

export interface Assets {
    _id: string;
    company: string;
    asset: string;
    type: "acao" | "opcao";
    additionalInfo: {
        allotmentSize?: number;
        operation?: "venda" | "compra";
        unitPrice: number;
    }
}


export interface CreateAssetInput {
    company: string;
    asset: string;
    type: "acao" | "opcao";
    additionalInfo: {
        allotmentSize?: number | undefined;
        operation?: string | undefined;
        unitPrice: number;
    }
}

export interface UpdateAssetInput {
    _id: string;
    company: string;
    asset: string;
    type: "acao" | "opcao";
    additionalInfo: {
        allotmentSize?: number | undefined;
        operation?: string;
        unitPrice: number;
    }
}

export interface AssetsModal {
    open: boolean;
    target?: "AssetsDetail";
    assets?: Assets;
}

console.log(assetsData);


export function useAssetsProvider() {
    const [assets, setAssets] = useState<Assets[]>([]);
    const [assetsModal, setAssetsModal] = useState<AssetsModal>({
        open: false,
    })

    const [isLoading, setLoading] = useState(false);

    async function createAsset(data: CreateAssetInput) {
        try {
            setLoading(true)
            const response = await api.post('/assets', { ...data });
            toast.success("Novo ativo cadastrado com sucesso");
            setLoading(false)
        } catch (error) {
            toast.error("Erro ao cadastrar ativo");
            setLoading(false)
            return;
        }
    }

    async function fetchAssets() {
        try {
            setLoading(true)
            const response = await api.get('/assets');
            setAssets(response.data);

        } catch (error) {
            toast.error("Erro ao carregar ativo: rode o json-server - npm run dev:server");
            setLoading(false);
            return;
        }
    }

    async function getAssetById(id: string) {
        try {
            const response = await api.get("/assets/" + id);

        } catch (error) {

        }
    }

    async function deleteAsset(id: string) {
        try {
            setLoading(true)
            const response = await api.delete("/assets/" + id);
            toast.success("O ativo foi excluído com sucesso");
            setLoading(false)
        } catch (error) {
            toast.error("Erro ao excluir ativo");
            setLoading(false)
            return;
        }
    }

    async function updateAsset(data: UpdateAssetInput) {
        try {
            setLoading(true)
            const response = await api.put("/assets/" + data._id, {
                ...data
            });
            toast.success("O ativo foi editado com sucesso");
            setLoading(false)
        } catch (error) {
            toast.error("Erro ao editar ativo");
            setLoading(false)
        }
    }

    return {
        assets,
        assetsModal,
        setAssetsModal,
        fetchAssets,
        createAsset,
        getAssetById,
        deleteAsset,
        updateAsset,
        isLoading,
    }
}