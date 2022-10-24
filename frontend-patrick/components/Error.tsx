import { ErrorMsg } from '../types';

const Error = ({ msg, details }: ErrorMsg) => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">{msg}</strong>
        <span className="block sm:inline">{details}</span>
      </div>
    </div>
  );
};

export default Error;
