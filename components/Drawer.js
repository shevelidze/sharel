import styles from '../styles/Drawer.module.css';
import Darkness from './Darkness';

export default function Drawer(props) {
    return (
        <div>
            <div
                id={styles.drawer}
                className={props.isEnabled ? styles.enabled : null}
            >
                Drawer
            </div>
            <Darkness onClick={props.onClick} isEnabled={props.isEnabled} />
        </div>
    );
}
