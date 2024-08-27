import { UpdateInput } from "../UpdateSensor/UpdateSensorSubComponents/UpdateSensorInput";
import { colors } from "../../utils/background/colorBackground"
import { backgroundStorage } from "../../utils/constants/constants";
import DropDown from "../Dropdown/Dropdown";
import { useLocalStorage } from "../../Context/LocalStorageContext";


const Settings = () => {
    const { changeBackground } = useLocalStorage();

    const handleOnChange = (colorOption) => {
        changeBackground(colorOption.target.value);
    }

    return (
        <div className="pt-20">
            <DropDown placeHolderText="Select Background Color" handleChange={handleOnChange} options={colors} />
        </div>
    )
};

export default Settings;