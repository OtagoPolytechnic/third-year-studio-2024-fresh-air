import { colors } from '../../utils/background/colorBackground';
import DropDown from '../Dropdown/Dropdown';
import { useStorage } from '../../Context/LocalStorageContext';
import logo from '../../Imgs/logo.svg';

const Settings = () => {
  const { changeBackground } = useStorage();

  const handleOnChange = (colorOption) => {
    if (colorOption.target.value === 'Select Background Color') return;
    changeBackground(colorOption.target.value);
  };

  return (
    <>
    <section className={'bg-white px-6 pt-10 pb-8 shadow-xl ring-1 mx-4 rounded-lg ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10'}>
      <DropDown
        placeHolderText="Select Background Color"
        handleChange={handleOnChange}
        options={colors}
        labelText={'Background'}
        labelForTag={'backgroundSettings'}
      />
      </section>

      
    </>
  );
};

export default Settings;
