import { TitleBar } from './components/TitleBar';
import { Link } from 'react-router';

export function Signup() {
  return (
    <div className="min-h-screen">
      <TitleBar />
      <div className="flex flex-row justify-center pt-15 bg-[url(building.jpg)] bg-cover mt-25 w-3/5 mx-auto ">
        <div className="bg-zinc-800 text-white flex flex-col justify-center items-center rounded-2xl m-5 p-5   font-semibold">
          <h1 className="text-2xl font-bold">Register Now</h1>
          <form>
            <h2 className="mt-4 ml-2">Email</h2>
            <input className="bg-orange-600 text-white hover:bg-white hover:text-slate-800 rounded-xl p-1 pl-2"></input>
            <h2 className="mt-4 ml-2">Confirm Email</h2>
            <input className="bg-orange-600 text-white hover:bg-white hover:text-slate-800 rounded-xl p-1 pl-2"></input>
            <h2 className="mt-4 ml-2">Date of Birth</h2>
            <input
              className="bg-orange-600 text-white rounded-xl p-1"
              type="date"
            ></input>
            <h2 className="mt-4 ml-2">Password</h2>
            <input
              type="password"
              className="bg-orange-600 hover:bg-white hover:text-slate-800 text-white rounded-xl p-1 pl-2 "
            ></input>
            <h2 className="mt-4 ml-2 ">Confirm Password</h2>
            <input
              type="password"
              className="bg-orange-600 rounded-xl p-1 text-white pl-2"
            ></input>
          </form>
          <button className="rounded-xl bg-orange-600   hover:bg-white hover:text-slate-800 p-3 m-5 w-2/4">
            Sign Up
          </button>
        </div>
        <div className="flex flex-col m-5 p-5 bg-zinc-800 text-white h-1/3 rounded-2xl ">
          <h1 className=" text-2xl font-semibold"> Already got an account?</h1>
          <Link to="/login">
            <button className="p-3 m-2 bg-orange-600 hover:bg-white hover:text-black rounded-xl">
              <p>Login here</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
