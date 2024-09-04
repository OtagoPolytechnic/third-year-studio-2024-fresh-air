import Login from '../Auth/Login';
import Logout from '../Auth/Logout';

export const LoginPage = () => {
  return (
    <>
      <div className="pt-40">
        <Login />
      </div>
      <div className="pt-40">
        <Logout />
      </div>
    </>
  );
};

export default LoginPage;
