import {
  FirestoreAuthProvider,
  useUserAuth
} from '../../Context/FirestoreAuthContext';

export const Logout = () => {
  const { logout} = useUserAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleLogout}>
        <button
          type={'submit'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Logout;
