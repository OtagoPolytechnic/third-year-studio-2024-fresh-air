export const UpdateDropdown = ({styles, value, headerValue, optionHeaderText, disabled, children, childrenUnassigned, onChange}) => {
    return (
        <>
        <select className={styles} onChange={onChange} value={value}>
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