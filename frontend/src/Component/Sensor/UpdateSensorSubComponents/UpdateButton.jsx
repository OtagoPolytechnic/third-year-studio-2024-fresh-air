export const UpdateButton = ({style, type, text, onClick}) => {
    return (
        <button className={style} type={type} onClick={onClick}>{text}</button>
    )
}