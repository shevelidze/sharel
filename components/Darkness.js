import { useEffect, useState } from 'react';
import styles from '../styles/Darkness.module.css';

const maxOpacity = 0.55;

function animateChange(forward, setOpacity, setDisplay) {
    if (forward) {
        setOpacity(0);
        setDisplay('block');
    }
    const animationStart = performance.now();
    const duration = 200;
    requestAnimationFrame(function animate(time) {
        let fraction = (time - animationStart) / duration;
        if (fraction > 1) fraction = 1;
        if (fraction === 1) {
            if (!forward) setDisplay('none');
            return;
        }
        if (!forward) fraction = 1 - fraction;
        setOpacity(fraction * maxOpacity);
        requestAnimationFrame(animate);
    });
}

export default function Darkness(props) {
    let [opacity, setOpacity] = useState(0);
    let [display, setDisplay] = useState('none');
    useEffect(
        animateChange.bind(null, props.isEnabled, setOpacity, setDisplay),
        [props.isEnabled]
    );
    return (
        <div
            style={{ '--opacity': opacity, '--display': display }}
            className={styles.darkness}
            onClick={props.onClick}
        />
    );
}
