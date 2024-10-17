export const UpdateDropdown = ({styles, value, headerValue, optionHeaderText, disabled, sensorData, sensorUnassigned, onChange}) => {
    // This sensorData.map is specifically for the dropdown menu
    // as it is checking for .id and .dev_eui properties
    return (
        <>
        <select className={styles} onChange={onChange} value={value}>
            <option value={headerValue} disabled={disabled}>
                {optionHeaderText}
            </option>
            {sensorData.length > 0 && (
                <>
            {sensorData.map(child => (
                <option key={child.id} value={child.dev_eui}>
                    {`${child.dev_eui} [${child.room_number !== null ? child.room_number : sensorUnassigned}] ${child.blockName ? child.blockName : ''}`}
                </option>
            ))}
            </>
        )}
        </select>
        </>
    )
};