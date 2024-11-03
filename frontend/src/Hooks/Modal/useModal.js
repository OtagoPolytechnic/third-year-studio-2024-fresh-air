import { useState } from 'react';

const useModal = () => {
  const [isModal, setIsModal] = useState({});

  const setModal = (key, modal) => {
    setIsModal((prevState) => ({
      ...prevState,
      [key]: modal,
    }));
  };

  const modal = (key) => {
  return isModal[key] || false;
  };

  return { modal, setModal };
};

export default useModal;
