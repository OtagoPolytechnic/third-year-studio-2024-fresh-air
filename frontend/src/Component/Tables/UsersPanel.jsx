import TableButton from './TableSubComponents/TableButton';
import UsersTable from './TableSubComponents/User/UsersTable';

const UsersPanel = () => {
  return (
    <>
      <TableButton text={'Add User'} />
      <section
        className={'relative overflow-x-auto mx-4 rounded-lg border shadow-sm'}
      >
        <UsersTable/>
      </section>
    </>
  );
};

export default UsersPanel;
