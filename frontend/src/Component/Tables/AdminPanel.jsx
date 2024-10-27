import Table from './TableSubComponents/Table';
import TableButtons from './TableSubComponents/TableButtons';

const AdminPanel = () => {
  return (
    <>
      <TableButtons />
      <section
        className={'relative overflow-x-auto mx-4 rounded-lg border shadow-sm'}
      >
        <Table />
      </section>
    </>
  );
};

export default AdminPanel;
