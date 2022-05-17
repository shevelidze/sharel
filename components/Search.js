import Input from '../components/Input';
import styles from '../styles/Search.module.css';

export default function Search(props) {
    return (
        <div className={styles.search}>
            <Input placeholder="Search" />
        </div>
    );
}
