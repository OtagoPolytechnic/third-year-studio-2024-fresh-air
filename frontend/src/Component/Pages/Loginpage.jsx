import {
  FirestoreAuthProvider,
  useUserAuth
} from '../../Context/FirestoreAuthContext';

export const LoginPage = () => {
  const { login, user } = useUserAuth();

  return (
    <FirestoreAuthProvider>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Login</h1>
        <label for="email"> E-mail </label>
        <input type="text" name="email" id="email">
            Email
        </input>
        <label for="pwd"> Password </label>
        <input type="password" name="pwd" id="pwd" >
            Password
        </input>
        <p>{user ? `Logged in as ${user.email}` : 'Not logged in'}</p>
        <p>Click the button to sign in</p>
        <button
          onClick={login}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Sign in
        </button>
      </div>
    </FirestoreAuthProvider>
  );
};

export default LoginPage;
