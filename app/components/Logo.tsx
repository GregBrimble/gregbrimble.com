const TightLogo = () => (
  <svg
    viewBox="0 0 18.89 21.04"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.66 6.97h5.01C18.17 2.89 14.53 0 9.79 0 4.32 0 0 3.85 0 10.55c0 6.48 3.98 10.49 9.85 10.49 5.27 0 9.04-3.27 9.04-8.77V9.56h-8.83v3.61h4.06c-.05 2.16-1.55 3.53-4.23 3.53-3.07 0-4.84-2.27-4.84-6.21 0-3.91 1.87-6.15 4.84-6.15 1.98 0 3.33.97 3.77 2.63z" />
  </svg>
);

const SquareLogo = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.215 8.45h5.01c-.5-4.08-4.14-6.97-8.88-6.97-5.47 0-9.79 3.85-9.79 10.55 0 6.48 3.98 10.49 9.85 10.49 5.27 0 9.04-3.27 9.04-8.77v-2.71h-8.83v3.61h4.06c-.05 2.16-1.55 3.53-4.23 3.53-3.07 0-4.84-2.27-4.84-6.21 0-3.91 1.87-6.15 4.84-6.15 1.98 0 3.33.97 3.77 2.63z" />
  </svg>
);

type Wrap = "tight" | "square";

export const Logo = ({ wrap = "square" }: { wrap?: Wrap }) => {
  switch (wrap) {
    case "tight":
      return <TightLogo />;
    case "square":
      return <SquareLogo />;
  }
};
