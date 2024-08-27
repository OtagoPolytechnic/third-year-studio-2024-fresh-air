import { UpdateInput } from "../UpdateSensor/UpdateSensorSubComponents/UpdateSensorInput";
import { colors } from "../../utils/background/colorBackground"
import { backgroundStorage } from "../../utils/constants/constants";
import DropDown from "../Dropdown/Dropdown";


const handleOnChange = (item) => {
    // takes the value from the dropdown, and sets it in localStorage
    localStorage.setItem(backgroundStorage, item.target.value);
}

const Settings = () => {
    return (
        <div className="pt-20">
            <DropDown placeHolderText="Select Background Color" handleChange={handleOnChange} options={colors} />
        </div>
    )
};

export default Settings;