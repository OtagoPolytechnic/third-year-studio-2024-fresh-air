export const UpdateBlockDropDown = ({styles, value, headerValue, optionHeaderText, disabled, blockData, onChange}) => {
    return (
        <>
        <select className={styles} onChange={onChange} value={value}>
            <option value={headerValue} disabled={disabled}>
                {optionHeaderText}
            </option>
            {blockData.length > 0 && (
                <>
            {blockData.map(child => (
                <option key={child.id} value={child.blockName}>
                    {child.blockName}
                </option>
            ))}
            </>
        )}
        </select>
        </>
    )
};