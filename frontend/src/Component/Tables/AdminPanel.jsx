import AdminTable from './TableSubComponents/Admin/AdminTable';
import TableButton from './TableSubComponents/TableButton';

const AdminPanel = () => {
  return (
    <>
      <TableButton text={'Add Device'} />
      <section
        className={'relative overflow-x-auto mx-4 rounded-lg border shadow-sm'}
      > <AdminTable />
      </section>
    </>
  );
};

export default AdminPanel;
