import Link from "next/link";


export default function FooterList(props) {
    let elementKey = 0;
    return (
        <div>
            <h3>{props.title}</h3>
            <ul>{
                props.elements.map(
                    (elementContent) => {
                        return <li key={elementKey++}>{elementContent}</li>
                    })
            }</ul>
        </div>
    );
}