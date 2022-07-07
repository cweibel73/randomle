export default function Button(props){
    return (
        <button value={props.value} id={props.value} className={props.className}
            onClick={props.onClick} style={props.style}>
            {props.value}
        </button>
        )
}