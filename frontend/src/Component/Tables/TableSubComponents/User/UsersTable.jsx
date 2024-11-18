import TableHeaders from "../TableHeaders";
import UserTableBody from "./UserTableBody";
import { tableHeadersUsers } from "../../../../utils/constants/constants";
import useSortableData from "../../../../Hooks/Tables/useSortableTable";
import { useGetUserList } from "../../../../Hooks/Users/useGetUserList";


const UsersTable = () => {
    const { users: initialData, apiError } = useGetUserList();
    const { sortedData, onSort, sortConfig } = useSortableData(initialData);
    return (
        <>
        {sortedData.length === 0 ? (
            <h1 className={'text-2xl text-center'}>No users found</h1>
        ) : (
        <>
        {apiError ? (
            <div className={'bg-red-500 text-white p-4'}>Error: {apiError}</div>
        ) : (
            <table className={'w-full text-sm text-left text-gray-500 divide-y divide-gray-200'}>
                <TableHeaders headers={tableHeadersUsers} onSort={onSort} sortConfig={sortConfig} />
                <UserTableBody tableFields={sortedData} />
            </table>
        )}
        </>
        )}
        </>
    );
};

export default UsersTable;