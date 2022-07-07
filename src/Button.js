export default function Button(props){
    return (
        <button value={props.value} id={props.value} onClick={props.onClick} style={props.style}>
            {props.value}
        </button>
        )
}