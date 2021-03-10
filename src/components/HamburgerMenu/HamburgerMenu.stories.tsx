import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import "../../styles/index.css";
import { AiOutlineHome } from "react-icons/ai";

export default {
  title: "HamburgerMenu",
  component: HamburgerMenu,
};

export const Default = (): React.ReactNode => (
  <HamburgerMenu
    isOpen
    navLinks={[{ label: "Egy", href: "/", Icon: AiOutlineHome }]}
    restNavLinks={[{ label: "Egy", href: "/", Icon: AiOutlineHome }]}
    alwaysShowingLinks={[{ label: "Egy", href: "/", Icon: AiOutlineHome }]}
  />
);

// navLinks = (t) => [
//   { label: t("home"), to: "/", Icon: AiOutlineHome },
//   { label: t("piers"), to: "/pontoane", Icon: GiFishingPole },
//   { label: t("grill"), to: "/locuri-de-gratar", Icon: GiBarbecue },
//   { label: t("prices"), to: "/preturi", Icon: RiPriceTag3Line },
//   { label: t("records"), to: "/recorduri", Icon: FiAward },
//   { label: t("posts"), to: "/posturi", Icon: BsFilePost },
//   { label: t("news"), to: "/noutati", Icon: RiNewspaperLine },
//   { label: t("rules"), to: "/regulament", Icon: BsListCheck },
// ];

// restNavLinks = (t) => [
//   { label: t("prices"), to: "/preturi", Icon: RiPriceTag3Line },
//   { label: t("records"), to: "/recorduri", Icon: FiAward },
//   { label: t("posts"), to: "/posturi", Icon: BsFilePost },
//   { label: t("news"), to: "/noutati", Icon: RiNewspaperLine },
//   { label: t("rules"), to: "/regulament", Icon: BsListCheck },
// ];

// alwaysShowingLinks = (t) => [
//   { label: t("home"), to: "/", Icon: AiOutlineHome },
//   { label: t("piers"), to: "/pontoane", Icon: GiFishingPole },
//   { label: t("grill"), to: "/locuri-de-gratar", Icon: GiBarbecue },
// ];
