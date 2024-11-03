import { UpdateButton } from "../../../Sensor/UpdateSensorSubComponents/UpdateButton";
import TableItem from "../TableItem";
import PopUp from "../../../Auth/PopUp";
import useModal from "../../../../Hooks/Modal/useModal";
const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

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
                    onClick={() => console.log(item.blockName)}
                />
                </td>
            </tr>
            ))}
        </tbody>
        {modal("showDeleteModal") && (
            <PopUp
            handleClick={() => setModal("showDeleteModal", false)}
            title="Delete block"
            message="Are you sure you want to delete this block?"
            confirm={() => setModal("showDeleteModal", false)}
            />
        )}
        </>
    );
    };

export default BlocksTableBody;