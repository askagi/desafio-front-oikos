import { useEffect } from "react";
import { AssetsDetail } from "../../components/AssetsDetail";
import { AssetsTable } from "../../components/AssetsTable";
import { useAssets } from "../../hooks/useAssets";
export function Dashboard() {

    const { fetchAssets, isLoading } = useAssets();

    useEffect(() => {
        fetchAssets();
    }, [isLoading])

    return (
        <>
            <AssetsDetail />
            <AssetsTable />
        </>
    )
}