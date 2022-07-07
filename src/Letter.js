export default function Letter(props) {
    return (
        <div className="bigSq" style={props.style}>
            {props.children}
        </div>
        )
}