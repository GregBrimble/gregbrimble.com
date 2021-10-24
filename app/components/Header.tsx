import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { SmartLink } from "./SmartLink";

const navigation = [
  { name: "Open Source", to: "/open-source" },
  { name: "Data", to: "/data" },
  { name: "Blog", href: "https://blog.gregbrimble.com/" },
  { name: "Newsletter", href: "https://newsletter.gregbrimble.com/" },
];

export const Header = () => {
  return (
    <header>
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-500 dark:border-gray-400 lg:border-none">
          <div className="flex items-center">
            {/* <Link to="/">
              <span className="sr-only">gregbrimble.com</span>
              <svg className="h-10 w-10 text-gray-900 dark:text-white">
                <Logo />
              </svg>
            </Link> */}
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                // <SmartLink
                //   key={link.name}
                //   to={link.to}
                //   href={link.href}
                //   className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                // >
                //   {link.name}
                // </SmartLink>
                <div>{link.name}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            // <SmartLink
            //   key={link.name}
            //   to={link.to}
            //   href={link.href}
            //   className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            // >
            //   {link.name}
            // </SmartLink>
            <div>{link.name}</div>
          ))}
        </div>
      </nav>
    </header>
  );
};
