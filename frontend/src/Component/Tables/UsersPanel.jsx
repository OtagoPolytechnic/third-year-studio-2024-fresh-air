import TableButton from './TableSubComponents/TableButton';
import UsersTable from './TableSubComponents/User/UsersTable';
import Register from '../Auth/Register';
import useModal from '../../Hooks/Modal/useModal';

const UsersPanel = () => {
  const { modal, setModal } = useModal();

  return (
    <>
      <TableButton text={'Add User'} onClick={() => setModal('showRegisterModal', true)} />
      <section
        className={'relative overflow-x-auto mx-4 rounded-lg border shadow-sm'}
      >
        <UsersTable/>
      </section>
      {modal('showRegisterModal') &&
      <Register
      onClick={() => setModal('showRegisterModal', false)}
      />
      }
    </>
  );
};

export default UsersPanel;
