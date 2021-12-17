import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  console.log(styles);
  return (
    <div id={styles.root}>
      <div id={styles.main_content}>
        <div id={styles.tagline}>
          <div>
            <p>Share your</p>
            <p>thoughts</p>
            <p>with people</p>
            <p>using <span className={styles.logo}>sharel</span></p>
            <div id={styles.buttons_wrapper}>
              <a href="/sign_up">Sign up</a>
              <a href="/sign_in">Sign in</a>
            </div>
          </div>
        </div>
        <div id={styles.illustrations}>
          <img className={styles.textbox} src="/main-page/box1.png" />
          <img className={styles.textbox} src="/main-page/box2.png" />
          <img className={styles.textbox} src="/main-page/box3.png" />
        </div>
      </div>
      <div id={styles.footer}>
        <div id={styles.social}>
          <i className="fab fa-telegram-plane"></i>
        </div>
      </div>
    </div>
  )
}
