import Image from 'next/image';
import styles from '../styles/Landing.module.css';
import Link from 'next/link';
import FooterList from '../components/FooterList';
import FacebookLogo from '../components/socialIcons/FacebookLogo';
import InstagramLogo from '../components/socialIcons/InstagramLogo';
import TwitterLogo from '../components/socialIcons/TwitterLogo';
import YoutubeLogo from '../components/socialIcons/YoutubeLogo';
import Loader from '../components/Loader';
import react from 'react';
import SignIn from '../components/signIn';
import SignUp from '../components/signUp';

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
                                <div
                                    onClick={() => {
                                        this.setState({
                                            renderElement: this.signUpElement,
                                        });
                                    }}
                                >
                                    Sign up
                                </div>
                                <div
                                    onClick={() => {
                                        this.setState({
                                            renderElement: this.signInElement,
                                        });
                                    }}
                                >
                                    Sign in
                                </div>
                            </div>
                        </div>
                        <div id={styles.image_wrapper}>
                            <Image
                                priority={true}
                                src="/main-page-laptop.png"
                                width={2362}
                                height={1356}
                                layout={'responsive'}
                            ></Image>
                        </div>
                    </div>
                </div>
                <div id={styles.footer}>
                    <div>
                        <div className="logo" id={styles.footer_logo}>
                            sharel
                        </div>
                        <div id={styles.social}>
                            <FacebookLogo></FacebookLogo>
                            <InstagramLogo></InstagramLogo>
                            <TwitterLogo></TwitterLogo>
                            <YoutubeLogo></YoutubeLogo>
                        </div>
                    </div>
                    <FooterList
                        title="Company"
                        elements={[
                            <Link key="about" href="/">
                                About us
                            </Link>,
                            <Link key="feedback" href="/">
                                Feedback
                            </Link>,
                        ]}
                    ></FooterList>
                    <FooterList
                        title="Information"
                        elements={[
                            <Link key="contacts" href="/">
                                Support
                            </Link>,
                            <Link key="feedback" href="/">
                                Feedback
                            </Link>,
                        ]}
                    ></FooterList>
                </div>
            </div>
        );
        this.goToLanding = () => {
            this.setState({ renderElement: this.landingElement });
        };

        this.signInElement = <SignIn onBackClick={this.goToLanding} />;
        this.goToSignIn = () => {
            this.setState({ renderElement: this.signInElement });
        };
        this.signUpElement = (
            <SignUp
                onBackClick={this.goToLanding}
                goToSignIn={this.goToSignIn}
            />
        );
        this.goToSignUp = () => {
            this.setState({ renderElement: this.signUpElement });
        };

        this.loaderRef = react.createRef();

        this.state = { renderElement: this.landingElement };
    }
    render() {
        return (
            <div>
                {this.state.renderElement}
                <Loader ref={this.loaderRef}></Loader>
            </div>
        );
    }
    componentDidMount() {
        if (localStorage.getItem('accessToken') !== null) {
            this.setState({ renderElement: 'Home element' });
        }
        window.addEventListener(
            'load',
            this.loaderRef.current.stopAnimation.bind(this.loaderRef.current)
        );
    }
}
