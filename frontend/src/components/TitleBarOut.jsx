import { Link } from 'react-router';

export function TitleBarOut() {
  return (
    <div className="title-bar text-white block text-bold bg-zinc-800 border-b-4 h-15 p-4 border-orange-600 border-bottom ">
      <div className="flex flex-row justify-between items-center ">
        <Link to="/">
          <h1 className="font-semibold">Software Company.</h1>
        </Link>
        <div className=" flex flex-row space-x-10">
          <Link to="/login">
            <h1>Login</h1>
          </Link>
          <Link to="/signup">
            <h1>Sign Up</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
