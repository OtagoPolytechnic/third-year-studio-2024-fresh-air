import { useState } from 'react';
import { useUserAuth } from '../../Context/FirestoreAuthContext';
import PopUp from './PopUp';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const { login, user } = useUserAuth();
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ headerText: '', pText: '' });
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    const { email, pwd } = e.target.elements;
    try {
      setError(false);
      await login(email.value, pwd.value);
      setModalContent({
        headerText: 'Successfully logged in',
        pText: 'Account has been successfully logged in, you can now access the dashboard.'
      });
    } catch (error) {
      setModalContent({
        headerText: 'Failed to login',
        pText: error.message || 'An error occurred while trying to login. Check that your email/password are correct.'
      });
      setError(true);
    }
    setModal(true);
  };

  if (user && modal === false) {
    return <Navigate to={'/'} replace={true} />;
  }

  const handleModal = () => {
    setModal(false);
  };

  return (
    <>
      <div class="flex min-h-full flex-col justify-center px-10 py-8 lg:mx-64 md:mr-14 md:mx-14 border rounded-lg mx-4 mr-4 shadow-lg">
        <div class="mx-auto w-full max-w">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <div class="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-2" onSubmit={handleLogin}>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              E-mail address
            </label>
            <input
              required
              type="text"
              name="email"
              id="email"
              placeholder="E-mail address"
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
            />
            <label
              for="pwd"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              required
              type="password"
              name="pwd"
              id="pwd"
              placeholder="Password"
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
            />
            {/* <p>{user ? `Logged in as ${user}` : 'Not logged in'}</p> */}
            {!user && (
              <button
                disabled={user}
                type={'submit'}
                class="flex w-full justify-center rounded-md bg-slate-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            )}
          </form>
        </div>
        {modal && <PopUp error={error} handleClick={handleModal} headerText={modalContent.headerText} pText={modalContent.pText} />}
      </div>
    </>
  );
};

export default Login;
