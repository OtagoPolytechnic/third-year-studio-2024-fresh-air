import { useState } from 'react';
import { UpdateButton } from '../../../Sensor/UpdateSensorSubComponents/UpdateButton';
import TableItem from '../TableItem';
import useModal from '../../../../Hooks/Modal/useModal';
import PopUp from '../../../Auth/PopUp';
import UpdateBlock from '../../../Block/UpdateBlock';
import AuthConfirmPopup from '../../../Auth/AuthConfirmPopup';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const BlocksTableBody = ({ tableFields }) => {
  const { modal, setModal } = useModal();
  const [error, setError] = useState(false);
  const [blockName, setBlockName] = useState('');

  const handleDelete = async (item) => {
    setModal('waiting', true);
    try {
      await fetch(`${apiKey}/api/v1/blocks/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blockId: item.id
        })
      });

      setModal('showDeleteBlockPopup', false);
      setModal('waiting', false);
      setModal('showDeleteModal', true);
    } catch (error) {
      setModal('showDeleteBlockPopup', false);
      setError(error);
    }
  };

  const handleBlockName = (blockName) => {
    setBlockName(blockName);
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
                onClick={() => {
                  handleBlockName(item.blockName);
                  setModal('showUpdateBlock', true);
                }}
              />
              <UpdateButton
                text="Delete"
                style="py-2 px-4 text-white bg-red-500 hover:bg-red-400 rounded-lg"
                onClick={() => setModal('showDeleteBlockPopup', true)}
              />
              {modal('waiting') && (
                <PopUp
                  headerText="Please wait"
                  pText="Processing your request"
                  hideButton={true}
                />
              )}

              {modal('showDeleteBlockPopup') && (
                <AuthConfirmPopup
                  onClick={() => setModal('showDeleteBlockPopup', false)}
                  handleDelete={() => handleDelete(item)}
                  headerText={"Delete Block?"}
                  pText={`Are you sure you want to delete ${item.blockName}?`}

                />
              )}

              {modal('showDeleteModal') && (
                <PopUp
                  handleClick={() => setModal('showDeleteModal', false)}
                  headerText="Block deleted"
                  pText={'Block has been successfully deleted'}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <>
        {modal('showUpdateBlock') && (
          <UpdateBlock
            onClick={() => setModal('showUpdateBlock', false)}
            blockName={blockName}
          />
        )}
      </>
    </>
  );
};
export default BlocksTableBody;
