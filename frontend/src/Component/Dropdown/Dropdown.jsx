// Maps through an array of options to display on screen
const DropDown = ({placeHolderText, handleChange, options }) => {
    return (
        <select onChange={handleChange}>
            {/* Initial option placeholder, disabled so cannot be used */}
            <option disabled={true}>{placeHolderText}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}
        </select>
    );
};

export default DropDown;