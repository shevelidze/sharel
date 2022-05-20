import UserIndicator from './UserIndicator';
import Search from './Search';
import styles from '../styles/HomeHeader.module.css';
import Burger from './Burger';
import Drawer from '../components/Drawer';
import { useState } from 'react';

export default function HomeHeader(props) {
    const [drawerIsEnabled, setGrawerIsEnabled] = useState(false);
    const toggleDrawerIsEnabled = setGrawerIsEnabled.bind(
        null,
        !drawerIsEnabled
    );
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.group}>
                    <Burger onClick={toggleDrawerIsEnabled} />
                    <div className={styles.logo}>sharel</div>
                </div>
                <Search />
                <UserIndicator />
            </div>
            <Drawer
                isEnabled={drawerIsEnabled}
                onClick={toggleDrawerIsEnabled}
            />
        </div>
    );
}
