export const UpdateInput = ({styles, type, placeholder, value, onChange}) => {
    return (
        <input
        onChange={onChange}
        className={styles}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={15}
        />
    );
};