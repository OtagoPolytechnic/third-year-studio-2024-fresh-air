import { UpdateButton } from '../../../Sensor/UpdateSensorSubComponents/UpdateButton';
import TableItem from '../TableItem';
import PopUp from '../../../Auth/PopUp';
import { useUserAuth } from '../../../../Context/FirestoreAuthContext';
import { deleteUserDocument } from '../../../../utils/firestoreFunctions/firestoreFunctions';
import useModal from '../../../../Hooks/Modal/useModal';
import { userRoles } from '../../../../utils/constants/constants';
import useGetUserInformation from '../../../../Hooks/Users/useGetUserInformation';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

const UserTableBody = ({ tableFields }) => {
  const { modal, setModal } = useModal();
  const { userData, loading } = useGetUserInformation();

  const handleDelete = async (userId) => {
    setModal('showDeleteModal', true);
    try {
      setModal('waiting', true);
      const response = await fetch(`${apiKey}/api/v1/users/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: userId
        })
      });
      if (response.ok) {
        await deleteUserDocument(userId);
      }
    } catch (error) {
      console.error('Failed to delete user');
    } finally {
      setModal('waiting', false);
    }
  };
  return (
    <>
      {loading ? (
        <h1 className={'font-bold text-2xl'}>Loading...</h1>
      ) : (
        <>
          {userData && (
            <tbody className="bg-white divide-y divide-gray-200">
              {tableFields.map((item) => (
                <tr key={item.uid} className="hover:bg-gray-100">
                  <TableItem item={item.firstName} />
                  <TableItem item={item.lastName} />
                  <TableItem item={item.role} />
                  <TableItem item={item.email} />
                  <TableItem item={item.lastSignInTime} />
                  <td className="text-right pr-2 py-2 flex justify-end">
                    <>
                      {userData.role === userRoles.superAdmin && (
                        <UpdateButton
                          text="Edit Password"
                          style="py-2 px-4 text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
                          onClick={() => console.log('Edit' + item.uid)}
                        />
                      )}

                      {userData.role === userRoles.superAdmin &&
                        item.role !== userRoles.superAdmin && (
                          <UpdateButton
                            text="Delete"
                            style="py-2 px-4 ml-2 text-white bg-red-500 hover:bg-red-400 rounded-lg"
                            onClick={() => handleDelete(item.uid)}
                          />
                        )}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </>
      )}
      {modal('showDeleteModal') && (
        <PopUp
          handleClick={() => setModal('showDeleteModal', false)}
          headerText="User deleted"
          pText="The user has been successfully deleted"
        />
      )}
      {modal('waiting') && (
        <PopUp
          handleClick={() => setModal('waiting', false)}
          headerText="Please wait"
          pText="Processing your request"
        />
      )}
    </>
  );
};

export default UserTableBody;
