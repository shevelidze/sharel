import React from "react";
import Image from "next/image";
import interfaceDemoImage from './interfaceDemo.png';
import { LinkButton } from '../Buttons';

const Landing: React.FC = () => {
  return (
    <div>
      <Image src={interfaceDemoImage} alt="Interface demo." />
      <div>
        <LinkButton href="/sign_in">Sign in</LinkButton>
        <LinkButton href="/sign_up">Sign up</LinkButton>
      </div>
    </div>
  );
};

export default Landing;
