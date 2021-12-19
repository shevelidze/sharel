import Link from "next/link";


export default function FooterList(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <ul>{
                props.elements.map(
                    (elementContent) => {
                        return <li>{elementContent}</li>
                    })
            }</ul>
        </div>
    );
}