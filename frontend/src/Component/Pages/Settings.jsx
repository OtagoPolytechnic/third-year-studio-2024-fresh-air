import { colors } from "../../utils/background/colorBackground"
import DropDown from "../Dropdown/Dropdown";
import { useStorage } from "../../Context/LocalStorageContext";
import logo from '../../Imgs/logo.svg'


const Settings = () => {
    const { changeBackground } = useStorage();

    const handleOnChange = (colorOption) => {
        changeBackground(colorOption.target.value);
    }

    return (
        <>
            <DropDown placeHolderText="Select Background Color" handleChange={handleOnChange} options={colors} />
        </>
    )
};

export default Settings;