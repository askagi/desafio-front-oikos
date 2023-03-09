import { AssetsContext } from "../../contexts/AssetsContext";
import { useContext } from 'react';

export function useAssets() {
    return useContext(AssetsContext);
}