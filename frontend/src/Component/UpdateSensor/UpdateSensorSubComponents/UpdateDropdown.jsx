export const UpdateDropdown = ({styles, value, headerValue, optionHeaderText, disabled, sensorData, sensorUnassigned, onChange}) => {
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
                    {`${child.dev_eui} [${child.roomNumber !== null ? child.roomNumber : sensorUnassigned}]`}
                </option>
            ))}
            </>
        )}
        </select>
        </>
    )
};