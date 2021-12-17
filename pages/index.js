import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div id="root">
      <div id="main-content">
        <div id="tagline">
          <div>
            <p>Share your</p>
            <p>thoughts</p>
            <p>with people</p>
            <p>using <span className="logo">sharel</span></p>
            <div id="buttons-wrapper">
              <div>Sign up</div>
              <div>Sign in</div>
            </div>
          </div>
        </div>
        <div id="illustrations">
          <img className="textbox" src="/main-page/box1.png" />
          <img className="textbox" src="/main-page/box2.png" />
          <img className="textbox" src="/main-page/box3.png" />
        </div>
      </div>
      <div id="footer">
        <div id="soocial">
          <i className="fab fa-telegram-plane"></i>
        </div>
      </div>
    </div>
  )
}
