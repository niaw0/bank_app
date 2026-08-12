import { CiSettings, CiUser, CiBank, CiChat1 } from 'react-icons/ci';
import { Link } from 'react-router';

export function TitleBar() {
  return (
    <div className="title-bar text-white block text-bold bg-zinc-800 border-b-4 h-15 p-4 border-orange-600 border-bottom ">
      <div className="flex flex-row justify-between items-center ">
        <Link to="/">
          <h1 className="font-semibold">Software Company.</h1>
        </Link>
        <div className=" flex flex-row space-x-5">
          <Link to="/support">
            <CiChat1 className="text-3xl" />
          </Link>
          <Link to="/settings">
            <CiSettings className="text-3xl" />
          </Link>
          <Link to="/profile">
            <CiUser className="text-3xl" />
          </Link>
          <Link to="/dashboard">
            <CiBank className="text-3xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}
