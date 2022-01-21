import react from 'react'
import LikePostButton from '../components/postButtons.js/Like'
import styles from '../styles/Home.module.css'

export default class Home extends react.Component {
    render() {
        return (
            <div className={styles.root}>
                <LikePostButton onClick={
                    (a, b, c) => {
                        console.log(a);
                        console.log(c);
                        if (!a) {
                            b();
                        } else {
                            c();
                        }
                    }
                }></LikePostButton>
            </div >
        )
    }
}