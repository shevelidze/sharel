import React from "react";
import Image from "next/image";
import interfaceDemoImage from './interfaceDemo.png';
import { LinkButton } from '../Buttons';
import landingSectionStyles from '../../styles/LandingSection.module.css';
import styles from './Landing.module.css';
import useUser from '../../lib/useUser';

const Landing: React.FC = () => {
  const [user] = useUser();

  return (
    <div className={landingSectionStyles.section}>
      <div className={styles.header}>
        <h1>sharel</h1>
        <div className={styles.buttonsWrapper}>
          {user === null ? (
            <>
              <LinkButton href="/sign_in">Sign in</LinkButton>
              <LinkButton href="/sign_up">Sign up</LinkButton>
            </>
          ) : (
            <LinkButton href="/home">To posts</LinkButton>
          )}
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image src={interfaceDemoImage} alt="Interface demo." />
      </div>
    </div>
  );
};

export default Landing;
