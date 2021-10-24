import { ReactNode } from "react";
import { Link } from "remix";
import { Logo } from "./Logo";
import { SmartLink } from "./SmartLink";

interface NavigationLink {
  name: ReactNode;
  to?: string;
  href?: string;
}

const navigation: NavigationLink[] = [
  { name: "Open Source", to: "/open-source" },
  { name: "Data", to: "/data" },
  { name: "Blog", to: "/blog" },
];

export const Header = () => {
  const isLive = false;

  const videoLink: NavigationLink = isLive
    ? {
        name: (
          <span className="flex items-center space-x-3">
            <span>Live</span>
            <span
              className="bg-red-100 dark:bg-red-900 h-4 w-4 rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="bg-red-400 dark:bg-red-500 h-2 w-2 rounded-full" />
            </span>
          </span>
        ),
        to: "/live",
      }
    : {
        name: "Videos",
        to: "/videos",
      };

  return (
    <header>
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-500 dark:border-gray-400 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">gregbrimble.com</span>
              <svg className="h-10 w-10 text-gray-900 dark:text-white">
                <Logo />
              </svg>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {[...navigation, videoLink].map((link) => (
                <SmartLink
                  key={link.to || link.href}
                  to={link.to}
                  href={link.href}
                  className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  {link.name}
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {[...navigation, videoLink].map((link) => (
            <SmartLink
              key={link.to || link.href}
              to={link.to}
              href={link.href}
              className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {link.name}
            </SmartLink>
          ))}
        </div>
      </nav>
    </header>
  );
};
