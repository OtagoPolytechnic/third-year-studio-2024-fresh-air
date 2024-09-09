import {useStorage } from "../../Context/LocalStorageContext";

const BackgroundWrapper = ({ children }) => {
  const { background } = useStorage();

  return (
    <div className={`min-h-screen ${background}`}>
      {children}
    </div>
  );
};

export default BackgroundWrapper;