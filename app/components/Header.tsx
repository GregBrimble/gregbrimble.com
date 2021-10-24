import type { AnchorHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDev } from "@fortawesome/free-brands-svg-icons/faDev";
import { faTwitch } from "@fortawesome/free-brands-svg-icons/faTwitch";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { MailIcon } from "@heroicons/react/outline";
import { SmartLink } from "./SmartLink";

const navigation = [
  {
    name: "LinkedIn",
    link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <SmartLink href="https://www.linkedin.com/in/gregbrimble" {...props} />
    ),
    icon: <FontAwesomeIcon icon={faLinkedin} />,
  },
  {
    name: "GitHub",
    link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <SmartLink href="https://github.com/gregbrimble/" {...props} />
    ),
    icon: <FontAwesomeIcon icon={faGithub} />,
  },
  {
    name: "DEV",
    link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <SmartLink href="https://dev.to/gregbrimble" {...props} />
    ),
    icon: <FontAwesomeIcon icon={faDev} />,
  },
  {
    name: "Twitter",
    link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <SmartLink href="https://twitter.com/gregbrimble" {...props} />
    ),
    icon: <FontAwesomeIcon icon={faTwitter} />,
  },
  {
    name: "Twitch",
    link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <SmartLink href="https://www.twitch.tv/gregbrimble" {...props} />
    ),
    icon: <FontAwesomeIcon icon={faTwitch} />,
  },
  {
    name: "YouTube",
    link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <SmartLink
        href="https://www.youtube.com/channel/UCUfprYvJEwcfNCcMnTGxVWA"
        {...props}
      />
    ),
    icon: <FontAwesomeIcon icon={faYoutube} />,
  },
  {
    name: "Instagram",
    link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <SmartLink href="https://www.instagram.com/gregbrimble/" {...props} />
    ),
    icon: <FontAwesomeIcon icon={faInstagram} />,
  },
  {
    name: "Email",
    link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <SmartLink href="mailto:hello@gregbrimble.com" {...props} />
    ),
    icon: <MailIcon />,
  },
];

export const Header = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <item.link
              key={item.name}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <span className="sr-only">{item.name}</span>
              <svg className="h-6 w-6" aria-hidden="true">
                {item.icon}
              </svg>
            </item.link>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400 dark:text-gray-500">
            &copy; 2021 gregbrimble.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
