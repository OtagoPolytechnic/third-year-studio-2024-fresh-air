import { UpdateButton } from "../../../Sensor/UpdateSensorSubComponents/UpdateButton";
import TableItem from "../TableItem";
import useModal from "../../../../Hooks/Modal/useModal";
import UpdateBlock from '../../../Block/UpdateBlock';


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
                    text="Update"
                    style="py-2 px-4 text-white bg-blue-500 hover:bg-sky-500 rounded-lg"
                    onClick={() => setModal('showUpdateModal', true)}
                />
                </td>
            </tr>
            ))}
        </tbody>
        {modal('showUpdateModal') && (
            <UpdateBlock
            onClick={() => setModal('showUpdateModal', false)}
            />
        )}
        </>
    );
    };

export default BlocksTableBody;