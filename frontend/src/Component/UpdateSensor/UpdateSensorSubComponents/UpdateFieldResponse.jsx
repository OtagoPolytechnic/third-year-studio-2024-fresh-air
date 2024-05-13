export const UpdateFieldResponse = ({styles,text}) => {
    // Just a basic reusable component for displaying text
    // In the Update form case, it is used to handle error and success messages
    // eg. 'Update Successful' with green-text or 'Error: No sensor selected' with red-text
    return (
        <>
        <p className={styles}>{text}</p>
        </>
    )
}