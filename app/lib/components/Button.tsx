import clsxm from '../utils/clsxm';

type ButtonProps = JSX.IntrinsicElements['button'] & {
  isLoading?: boolean;
};

const Spinner = () => (
  <svg
    className="h-6 w-6 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button = ({
  className,
  children,
  isLoading,
  ...props
}: ButtonProps) => (
  <button
    className={clsxm(
      'flex min-w-[140px] items-center justify-center space-x-2 rounded-xl bg-black px-5 py-2 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-500',
      className
    )}
    {...props}
  >
    {isLoading ? <Spinner /> : children}
  </button>
);
