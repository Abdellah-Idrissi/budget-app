import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid"

const Error = () => {

  return (
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
      <div className="max-w-lg mx-auto space-y-3 text-center">
        <h3 className="text-gray-800 font-semibold text-[17px]">404 Error</h3>
        <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
          Page not found
        </p>
        <p className="text-gray-600 max-w-[300px] mx-auto">
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to={'/'}
            className="block blackBtn mt-1"
          >
            Go back <HomeIcon className="w-[18px] inline ml-1 relative -top-[2px]"/>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
