import TableItem from '../TableItem';
import useGetUserInformation from '../../../../Hooks/Users/useGetUserInformation';
import UserTableActions from './UserTableActions';

const UserTableBody = ({ tableFields }) => {
  const { userData } = useGetUserInformation();

  return (
    <>
      {userData && (
       <tbody className="bg-white divide-y divide-gray-200">
       {tableFields.map((item, index) => (
         <tr key={item.uid || index} className="hover:bg-gray-100">
           <TableItem item={item.firstName} />
           <TableItem item={item.lastName} />
           <TableItem item={item.role} />
           <TableItem item={item.email} />
           <TableItem item={item.lastSignInTime} />
              <td className="text-right pr-2 py-2 flex justify-end">
                <UserTableActions userDataRole={userData.role} item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
};

export default UserTableBody;
