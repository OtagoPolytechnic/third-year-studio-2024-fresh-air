export const Error = ({children}) => {
    return (
        <>
        <p className={'text-red-500 text-center border-red-500 rounded-lg'}>{children}</p>
        </>
    )
}