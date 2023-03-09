import { createContext, ReactNode } from "react";
import { Assets, AssetsModal, CreateAssetInput, UpdateAssetInput, useAssetsProvider } from "../hooks/useAssets/useAssetsProvider";


interface AssetContextType {
    assets: Assets[];
    assetsModal: AssetsModal;
    isLoading: boolean;
    setAssetsModal: (assetsModal: AssetsModal) => void;
    fetchAssets: () => Promise<void>;
    createAsset: (data: CreateAssetInput) => Promise<void>;
    getAssetById: (id: string) => Promise<void>;
    deleteAsset: (id: string) => Promise<void>;
    updateAsset: (data: UpdateAssetInput) => Promise<void>;
}

interface AssetProviderProps {
    children: ReactNode
}

export const AssetsContext = createContext({} as AssetContextType)

export function AssetsProvider({ children }: AssetProviderProps) {
    const assetsProvider = useAssetsProvider();
    return (
        <AssetsContext.Provider value={assetsProvider}>
            {children}
        </AssetsContext.Provider>
    )
}