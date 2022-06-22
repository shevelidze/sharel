import React from "react";
import Image from "next/image";
import interfaceDemoImage from "./interface_demo.png";

const Landing: React.FC = () => {
    return (
        <div>
            <Image src={interfaceDemoImage} alt="Interface demo." />
        </div>
    );
};

export default Landing;
