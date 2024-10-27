import { UpdateButton } from '../../Sensor/UpdateSensorSubComponents/UpdateButton';
import TableItem from './TableItem';

const TableBody = ({ tableFields }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {tableFields.map((item) => (
        <tr key={item.id} className="hover:bg-gray-100">
          <TableItem item={item.dev_eui} />
          <TableItem item={item.room_number} />
          <TableItem item={item.blockName} />
          <td className="text-right pr-2 py-2 flex justify-end">
            <UpdateButton
              text="Edit"
              style="py-2 px-4 text-white bg-blue-500 rounded-lg"
              onClick={(() => console.log(item))}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
