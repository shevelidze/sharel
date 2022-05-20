import styles from '../styles/Burger.module.css';

export default function Burger(props) {
    return (
        <div id={styles.burger} onClick={props.onClick}>
            <div />
            <div />
            <div />
        </div>
    );
}
