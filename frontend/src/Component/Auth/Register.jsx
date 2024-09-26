import { useState } from 'react';
import { accountRoles } from '../../utils/constants/constants';
import { registerUser } from '../../utils/firestoreFunctions/firestoreFunctions';
import TextInput from '../Input/TextInput';
import Label from '../Label/Label';
import SelectInput from '../Input/SelectInput';
import PopUp from './PopUp';
const Register = ({styles}) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({ headerText: '', pText: '' });
  const [error, setError] = useState(false);

  const handleModal = () => {
    setModal(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, registerPassword, role, firstName, lastName } = e.target.elements;
  
    try {
      setError(false);
      await registerUser(email.value, registerPassword.value, role.value, firstName.value, lastName.value);
      setModalContent({
        headerText: 'Successfully Registered',
        pText: 'Account has been successfully registered.'
      });
    } catch (error) {
      setModalContent({
        headerText: 'Registration Failed',
        pText: error.message || 'An error occurred while registering the account. Please try again.'
      });
      setError(true);
    }
    setModal(true);
  };

  return (
    <div className={`${styles}`}>
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register new user
      </h2>
      <form className="space-y-2" onSubmit={handleRegister}>
        <Label htmlFor="registerEmail">E-mail address</Label>
        <TextInput
          id="registerEmail"
          type="text"
          name="email"
          placeholder="E-mail address"
          required
          ariaLabel="Enter your e-mail address"
        />

        <Label htmlFor="registerPassword">Password</Label>
        <TextInput
          id="registerPassword"
          type="password"
          name="registerPassword"
          placeholder="Password"
          required
          ariaLabel="Enter your password"
        />

        <Label htmlFor="role">Role</Label>
        <SelectInput
          id="role"
          name="role"
          required
          ariaLabel="Select your role"
          options={accountRoles}
        />

        <Label htmlFor="firstName">First Name</Label>
        <TextInput
          id="firstName"
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          ariaLabel="Enter your first name"
        />

        <Label htmlFor="lastName">Last Name</Label>
        <TextInput
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          ariaLabel="Enter your last name"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Register
        </button>
      </form>
      {modal && (
        <PopUp
          handleClick={handleModal}
          headerText={modalContent.headerText}
          pText={modalContent.pText}
          error={error}
        />
      )}
    </div>
  );
};

export default Register;