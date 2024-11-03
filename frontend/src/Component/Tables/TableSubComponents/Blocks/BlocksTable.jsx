import TableHeaders from "../TableHeaders";

import { tableHeadersBlocks } from "../../../../utils/constants/constants";
import { useGetBlockList } from "../../../../Hooks/Blocks/useGetBlockList";
import useSortableData from "../../../../Hooks/Tables/useSortableTable";
import BlocksTableBody from "./BlocksTableBody";

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const BlocksTable = () => {
    const { blocks: initialData, apiError } = useGetBlockList(`${apiKey}/api/v1/blocks`);
    const {sortedData, onSort, sortConfig} = useSortableData(initialData);

    return (
        <>
        {sortedData.length === 0 ? (
            <h1 className={'text-2xl text-center'}>No blocks found</h1>
        ) : (
            <>
            {apiError ? (
                <div className={'bg-red-500 text-white p-4'}>Error: {apiError}</div>
            ) : (
                <table className={'w-full text-sm text-left text-gray-500 divide-y divide-gray-200'}>
                    <TableHeaders headers={tableHeadersBlocks} onSort={onSort} sortConfig={sortConfig}/>
                    <BlocksTableBody tableFields={sortedData}/>
                </table>
            )}
            </>
        )}
        </>
    );
};

export default BlocksTable;