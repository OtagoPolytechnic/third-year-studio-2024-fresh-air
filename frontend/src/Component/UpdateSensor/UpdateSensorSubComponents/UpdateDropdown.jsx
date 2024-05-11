export const UpdateDropdown = ({value, headerValue, optionHeaderText, disabled, children, childrenUnassigned, onChange}) => {
    return (
        <>
        <select onChange={onChange} value={value}>
            <option value={headerValue} disabled={disabled}>
                {optionHeaderText}
            </option>
            {children.map(child => (
                <option key={child.id} value={child.dev_eui}>
                    {`${child.dev_eui} [${child.roomNumber !== null ? child.roomNumber : childrenUnassigned}]`}
                </option>
            ))}
        </select>
        </>
    )
};