import { UpdateButton } from '../../../Sensor/UpdateSensorSubComponents/UpdateButton';
import { userRoles } from '../../../../utils/constants/constants';
import { deleteUserDocument } from '../../../../utils/firestoreFunctions/firestoreFunctions';
import useModal from '../../../../Hooks/Modal/useModal';
import PopUp from '../../../Auth/PopUp';
import { useState } from 'react';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const UserTableActions = ({ userDataRole, item }) => {
  const { modal, setModal } = useModal();
  const [error, setError] = useState('false');

  const handleDelete = async (userId) => {
    setModal('waiting', true);
    try {
      const response = await fetch(`${apiKey}/api/v1/users/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: userId })
      });
      if (response.ok) {
        await deleteUserDocument(userId);
      }
      setModal('waiting', false);
      setModal('showDeleteModal', true);

    } catch (error) {
      setError(error);
      setModal('error', true);
    }
  };

  if (userDataRole !== userRoles.superAdmin) return null;

  return (
    <>
      <UpdateButton
        text="Edit Password"
        style="py-2 px-4 text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
        onClick={() => console.log('Edit' + item.uid)}
      />
      {item.role !== userRoles.superAdmin && (
        <UpdateButton
          text="Delete"
          style="py-2 px-4 ml-2 text-white bg-red-500 hover:bg-red-400 rounded-lg"
          onClick={() => handleDelete(item.uid)}
        />
      )}
      {modal('waiting') && (
        <PopUp
          headerText="Please wait"
          hideButton={true}
          pText="Processing your request"
        />
      )}
      {modal('showDeleteModal') && (
        <PopUp
          handleClick={() => setModal('showDeleteModal', false)}
          headerText="User deleted"
          pText="The user has been successfully deleted"
        />
      )}
      {modal('error') && (
        <PopUp
          handleClick={() => setModal('error', false)}
          headerText="Error"
          pText="An error occurred while deleting the user"
          error={error}
        />
      )}
    </>
  );
};

export default UserTableActions;
