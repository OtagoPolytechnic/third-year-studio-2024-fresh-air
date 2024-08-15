import { FaSpinner } from 'react-icons/fa';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center text-center mt-20">
      <FaSpinner className="animate-spin h-20 w-20 mr-3" />
    </div>
  );
};
