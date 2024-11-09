import { useState } from 'react';
import { accountRoles } from '../../utils/constants/constants';
import { registerUser } from '../../utils/firestoreFunctions/firestoreFunctions';
import TextInput from '../Input/TextInput';
import Label from '../Label/Label';
import SelectInput from '../Input/SelectInput';
import PopUp from './PopUp';
import useModal from '../../Hooks/Modal/useModal';

const Register = ({ onClick }) => {
  const { modal, setModal } = useModal();
  const [modalContent, setModalContent] = useState({
    headerText: '',
    pText: ''
  });
  const [error, setError] = useState(false);

  const handleModal = () => {
    setModal('handleModel', false);
    setModal('showRegisterModal', false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, registerPassword, role, firstName, lastName } =
      e.target.elements;
    try {
      setModal('registerUser', true);
      setError(false);
      await registerUser(
        email.value,
        registerPassword.value,
        role.value,
        firstName.value,
        lastName.value
      );
      setModalContent({
        headerText: 'Successfully Registered',
        pText: 'Account has been successfully registered.'
      });
    } catch (error) {
      setModalContent({
        headerText: 'Registration Failed',
        pText:
          error.message ||
          'An error occurred while registering the account. Please try again.'
      });
      setError(true);
    } finally {
      setModal('registerUser', false);
    }
    setModal('handleModel', true);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity b"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
            <button
              onClick={onClick}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2
              id="modal-title"
              className="text-center text-2xl font-bold tracking-tight text-gray-900"
            >
              Register New User
            </h2>
            <form className="space-y-4 mt-6" onSubmit={handleRegister}>
              <div>
                <Label htmlFor="registerEmail">E-mail address</Label>
                <TextInput
                  id="registerEmail"
                  type="email"
                  name="email"
                  placeholder="E-mail address"
                  required
                  ariaLabel="Enter your e-mail address"
                />
              </div>

              <div>
                <Label htmlFor="registerPassword">Password</Label>
                <TextInput
                  id="registerPassword"
                  type="password"
                  name="registerPassword"
                  placeholder="Password"
                  required
                  ariaLabel="Enter your password"
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <SelectInput
                  id="role"
                  name="role"
                  required
                  ariaLabel="Select your role"
                  options={accountRoles}
                />
              </div>

              <div>
                <Label htmlFor="firstName">First Name</Label>
                <TextInput
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  ariaLabel="Enter your first name"
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <TextInput
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  ariaLabel="Enter your last name"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-sky-500 text-white py-2 px-4 rounded-md"
              >
                Register
              </button>
            </form>
          </div>
          {modal('handleModel') && (
            <PopUp
              handleClick={handleModal}
              headerText={modalContent.headerText}
              pText={modalContent.pText}
              error={error}
            />
          )}
          {modal('registerUser') && (
            <PopUp
            hideButton={true}
              handleClick={() => setModal('registerUser', false)}
              headerText="Registering User"
              pText="Please wait while we register the user."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
