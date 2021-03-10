import React from "react";
import Header from "./Header";
import "../../styles/index.css";
import { AiOutlineHome } from "react-icons/ai";
import { IoLogoChrome } from "react-icons/io";
import { MdLink, MdMenu, MdPayment } from "react-icons/md";

export default {
  title: "Header",
  component: Header,
};

export const Default = (): React.ReactNode => (
  <Header
    navLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    restNavLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    alwaysShowingLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    // callToActionButton={{ text: "Buy now!", Icon: MdPayment, to: "/" }}
    // hamburgerMenu={{ text: "Menu", Icon: MdMenu, to: "/" }}
  />
);
export const withLogo = (): React.ReactNode => (
  <Header
    navLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    restNavLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    alwaysShowingLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    LogoComp={{ Icon: IoLogoChrome, to: "/" }}
    // callToActionButton={{ text: "Buy now!", Icon: MdPayment, to: "/" }}
    // hamburgerMenu={{ text: "Menu", Icon: MdMenu, to: "/" }}
  />
);
export const hamburgerMenu = (): React.ReactNode => (
  <Header
    navLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    restNavLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    alwaysShowingLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    LogoComp={{ Icon: IoLogoChrome, to: "/" }}
    // callToActionButton={{ text: "Buy now!", Icon: MdPayment, to: "/" }}
    hamburgerMenu={{ text: "Menu", Icon: MdMenu, to: "/" }}
  />
);
export const callToActionButton = (): React.ReactNode => (
  <Header
    navLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    restNavLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    alwaysShowingLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    LogoComp={{ Icon: IoLogoChrome, to: "/" }}
    callToActionButton={{ text: "Buy now!", Icon: MdPayment, to: "/" }}
    // hamburgerMenu={{ text: "Menu", Icon: MdMenu, to: "/" }}
  />
);
export const menuAndCallToAction = (): React.ReactNode => (
  <Header
    navLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    restNavLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    alwaysShowingLinks={[
      { label: "LinkOne", href: "/", Icon: MdLink },
      { label: "LinkTwo", href: "/", Icon: MdLink },
      { label: "LinkThree", href: "/", Icon: MdLink },
      { label: "LinkFour", href: "/", Icon: MdLink },
      { label: "LinkFive", href: "/", Icon: MdLink },
    ]}
    LogoComp={{ Icon: IoLogoChrome, to: "/" }}
    callToActionButton={{ text: "Buy now!", Icon: MdPayment, to: "/" }}
    hamburgerMenu={{ text: "Menu", Icon: MdMenu, to: "/" }}
  />
);
