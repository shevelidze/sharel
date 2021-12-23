import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Loader from '../components/Loader';
import FooterList from '../components/FooterList';
import FacebookLogo from '../components/social-icons/FacebookLogo';
import InstagramLogo from '../components/social-icons/InstagramLogo';
import TwitterLogo from '../components/social-icons/TwitterLogo';
import YoutubeLogo from '../components/social-icons/YoutubeLogo';

export default function Home() {
  return (
    <div id={styles.root}>
      <div id={styles.main_content}>
        <div id={styles.tagline}>
          <div>
            <p>Share your</p>
            <p>thoughts</p>
            <p>with people</p>
            <p>using <span className='logo'>sharel</span></p>
            <div id={styles.buttons_wrapper}>
              <Link href="/sign_up">Sign up</Link>
              <Link href="/sign_in">Sign in</Link>
            </div>
          </div>
        </div>
        <Image src='/main-page-laptop.png' width={2362} height={1356}></Image>
      </div>
      <div id={styles.footer}>
        <div>
          <div className='logo' id={styles.footer_logo}>sharel</div>
          <div id={styles.social}>
            <FacebookLogo></FacebookLogo>
            <InstagramLogo></InstagramLogo>
            <TwitterLogo></TwitterLogo>
            <YoutubeLogo></YoutubeLogo>
          </div>
        </div>
        <FooterList title='Company' elements={[<Link href='about'>About us</Link>, <Link href='feedback'>Feedback</Link>]}></FooterList>
        <FooterList title='Information' elements={[<Link href='contact'>Support</Link>, <Link href='feedback'>Feedback</Link>]}></FooterList>
      </div>
    </div>
  )
}
