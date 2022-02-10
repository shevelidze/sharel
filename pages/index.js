import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import Link from 'next/link';
import FooterList from '../components/FooterList';
import FacebookLogo from '../components/social-icons/FacebookLogo';
import InstagramLogo from '../components/social-icons/InstagramLogo';
import TwitterLogo from '../components/social-icons/TwitterLogo';
import YoutubeLogo from '../components/social-icons/YoutubeLogo';
import Loader from '../components/Loader'
import react from 'react';
import SignIn from '../components/signIn'
import SignUp from '../components/signUp'


export default class Home extends react.Component {
  constructor(props) {
    super(props);

    this.landingElement = (
      <div id={styles.root}>
        <div id={styles.main_content}>
          <div>
            <div id={styles.line}>
              <div id={styles.logo}>sharel</div>
              <div id={styles.buttons_wrapper}>
                <div onClick={() => { this.setState({ renderElement: this.signUpElement }) }}>Sign up</div>
                <div onClick={() => { this.setState({ renderElement: this.signInElement }) }}>Sign in</div>
              </div>
            </div>
            <div id={styles.image_wrapper}>
              <Image src='/main-page-laptop.png' width={2362} height={1356} layout={'responsive'}></Image>
            </div>
          </div>
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
          <FooterList title='Company' elements={[<Link href='about' key="about">About us</Link>, <Link key="feedback" href='feedback'>Feedback</Link>]}></FooterList>
          <FooterList title='Information' elements={[<Link key='contacts' href='contact'>Support</Link>, <Link key='feedback' href='feedback'>Feedback</Link>]}></FooterList>
        </div>

      </div>
    );
    this.goToLanding = () => { this.setState({ renderElement: this.landingElement }) };

    this.signInElement = <SignIn onBackClick={this.goToLanding}></SignIn>
    this.signUpElement = <SignUp onBackClick={this.goToLanding}></SignUp>


    this.loaderRef = react.createRef();

    this.state = { renderElement: this.landingElement };
  }
  render() {
    return (
      <div>
        {this.state.renderElement}
        <Loader ref={this.loaderRef}></Loader>
      </div>
    )
  }
  componentDidMount() {
    if (localStorage.getItem('accessToken') !== null) {
      this.setState({ renderElement: 'Home element' });
    }
    this.loaderRef.current.stopAnimation();
  }
}
