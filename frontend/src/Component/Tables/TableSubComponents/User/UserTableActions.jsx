import { UpdateButton } from '../../../Sensor/UpdateSensorSubComponents/UpdateButton';
import { userRoles } from '../../../../utils/constants/constants';
import { deleteUserDocument } from '../../../../utils/firestoreFunctions/firestoreFunctions';
import useModal from '../../../../Hooks/Modal/useModal';
import PopUp from '../../../Auth/PopUp';
import { useState } from 'react';
import UpdatePassword from '../../../Auth/UpdatePassword';
import AuthConfirmPopup from '../../../Auth/AuthConfirmPopup';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const UserTableActions = ({ userDataRole, item }) => {
  const { modal, setModal } = useModal();
  const [error, setError] = useState('false');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordValue = (e) => {
    setNewPassword(e.target.value);
  };

  const handleDeleteUser = async (item) => {
    if (item.role === userRoles.superAdmin) return;
    setModal('waiting', true);
    try {
      const response = await fetch(`${apiKey}/api/v1/users/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: item.userId })
      });

      if (response.ok) {
        await deleteUserDocument(item.userId);
      }

      setModal('waiting', false);
      setModal('showDeleteModal', false);
      setModal('showUserDeletedModal', true);
    } catch (error) {
      setError(error);
      setModal('waiting', false);
      setModal('showDeleteModal', false);
      setModal('error', true);
    }
  };

  const handlePasswordChange = async (e, item, newPassword) => {
    e.preventDefault();
    setModal('waiting', true);
    try {
      await fetch(`${apiKey}/api/v1/users/resetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: item.userId, password: newPassword })
      });
      setModal('showPasswordReset', false);
      setModal('waiting', false);
      setModal('showPasswordResetSuccess', true);
    } catch (error) {
      setError(error);
      setModal('error', true);
    } finally {
      setNewPassword('');
    }
  };

  if (userDataRole !== userRoles.superAdmin) return null;

  return (
    <>
      {item.role !== userRoles.superAdmin && (
        <UpdateButton
          text="Edit Password"
          style="py-2 px-4 text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
          onClick={() => setModal('showPasswordReset', true)}
        />
      )}
      {modal('showPasswordReset') && (
        <UpdatePassword
          onClick={() => setModal('showPasswordReset', false)}
          onChange={handlePasswordValue}
          onSubmit={(e) => handlePasswordChange(e, item, newPassword)}
          inputValue={newPassword}
          userId={item.userId}
        />
      )}

      {modal('showPasswordResetSuccess') && (
        <PopUp
          handleClick={() => setModal('showPasswordResetSuccess', false)}
          headerText="Password Reset"
          pText="The password has been successfully reset"
        />
      )}

      {item.role !== userRoles.superAdmin && (
        <UpdateButton
          text="Delete"
          style="py-2 px-4 ml-2 text-white bg-red-500 hover:bg-red-400 rounded-lg"
          onClick={() => setModal('showDeleteModal', true)}
        />
      )}

      {modal('showDeleteModal') && (
        <AuthConfirmPopup
          onClick={() => setModal('showDeleteModal', false)}
          handleDelete={() => handleDeleteUser(item)}
          headerText={'Delete User?'}
          pText={`Are you sure you want to delete ${item.firstName} ${item.lastName}?`}
        />
      )}

      {modal('showUserDeletedModal') && (
        <PopUp
          handleClick={() => setModal('showUserDeletedModal', false)}
          headerText="User deleted"
          pText="The user has been successfully deleted"
        />
      )}

      {modal('waiting') && (
        <PopUp
          headerText="Please wait"
          hideButton={true}
          pText="Processing your request"
        />
      )}

      {modal('error') && (
        <PopUp
          handleClick={() => setModal('error', false)}
          headerText="Error"
          pText="An error occurred while processing your request"
          error={error}
        />
      )}
    </>
  );
};

export default UserTableActions;
