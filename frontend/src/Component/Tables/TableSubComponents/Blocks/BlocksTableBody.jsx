import {useState} from 'react';
import { UpdateButton } from '../../../Sensor/UpdateSensorSubComponents/UpdateButton';
import TableItem from '../TableItem';
import useModal from '../../../../Hooks/Modal/useModal';
import PopUp from '../../../Auth/PopUp';
import TableButton from '../TableButton';
import UpdateBlock from '../../../Block/UpdateBlock';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const BlocksTableBody = ({ tableFields }) => {
  const { modal, setModal } = useModal();
  const [error, setError] = useState(false);

  const handleDelete = async (blockId) => {
      setModal('waiting', true);
      try {
        await fetch(`${apiKey}/api/v1/blocks/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blockId: blockId
            })
        });
        
        setModal('waiting', false);


    } catch (error) {
        setError(error);
    } finally {
      setModal('showDeleteModal', true);
    }
  };

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200">
        {tableFields.map((item) => (
          <tr key={item.id} className="hover:bg-gray-100">
            <TableItem item={item.blockName} />
            <td className="text-right pr-2 py-2 flex justify-end">
              <UpdateButton
                text="Edit"
                style="py-2 px-4 text-white mr-2 bg-blue-500 hover:bg-blue-400 rounded-lg"
                onClick={() => setModal('showUpdateBlock', true)}
              />
              <UpdateButton
                text="Delete"
                style="py-2 px-4 text-white bg-red-500 hover:bg-red-400 rounded-lg"
                onClick={() => handleDelete(item.id)}
              />
              {modal('waiting') && (
                <PopUp
                  handleClick={() => setModal('waiting', false)}
                  headerText="Please wait"
                  pText="Processing your request"
                  hideButton={true}
                />
              )}
              {modal('showUpdateBlock') && (
                <UpdateBlock
                  onClick={() => setModal('showUpdateBlock', false)}
                  blockName={item.blockName}
                />
              )}
              {modal('showDeleteModal') && (
                <PopUp
                  handleClick={() => setModal('showDeleteModal', false)}
                  blockId={item.id}
                  headerText="Block deleted"
                  error={error}
                  pText={error ? error.message : 'The block has been successfully deleted'}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};
export default BlocksTableBody;
