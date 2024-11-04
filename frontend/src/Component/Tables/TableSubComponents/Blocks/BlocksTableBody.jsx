import { UpdateButton } from "../../../Sensor/UpdateSensorSubComponents/UpdateButton";
import TableItem from "../TableItem";
import useModal from "../../../../Hooks/Modal/useModal";


const BlocksTableBody = ({ tableFields }) => {
    const { modal, setModal } = useModal();

    return (
        <>
        <tbody className="bg-white divide-y divide-gray-200">
            {tableFields.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
                <TableItem item={item.blockName} />
                <td className="text-right pr-2 py-2 flex justify-end">
                <UpdateButton
                    text="Delete"
                    style="py-2 px-4 text-white bg-red-500 hover:bg-red-400 rounded-lg"
                    // onClick={() => setModal('showDeleteModal', true)}
                    onClick={() => alert('Under Construction')}
                />
                </td>
            </tr>
            ))}
        </tbody>
        </>
    );
    };

export default BlocksTableBody;