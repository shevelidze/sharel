import UserIndicator from './UserIndicator';
import Search from './Search';
import styles from '../styles/HomeHeader.module.css';

export default function HomeHeader(props) {
    return (
        <div className={styles.header}>
            <div className={styles.group}>
                <svg
                    width="40"
                    height="14"
                    viewBox="0 0 40 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="40" height="2" fill="white" />
                    <rect
                        width="40"
                        height="2"
                        transform="translate(0 6)"
                        fill="white"
                    />
                    <rect
                        width="40"
                        height="2"
                        transform="translate(0 12)"
                        fill="white"
                    />
                </svg>
                <div className={styles.logo}>sharel</div>
            </div>
            <Search />
            <UserIndicator />
        </div>
    );
}
