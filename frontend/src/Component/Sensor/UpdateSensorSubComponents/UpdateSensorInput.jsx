export const UpdateInput = ({styles, type, placeholder, value, onChange, disabled}) => {
    return (
        <input
        onChange={onChange}
        className={styles}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={15}
        disabled={disabled}
        />
    );
};