import { TitleBar } from "./components/TitleBar";

export function Signup() {
  return (
    <div className="">
      <TitleBar />
      <div className="bg-orange-600 flex flex-col justify-center w-1/3">
        <form>
          <h2 className="mt-2">Email</h2>
          <input className="bg-white rounded-xl m-2"></input>
          <h2 className="mt-2">Email</h2>
          <input className="bg-white rounded-xl m-2" type="date"></input>
          <h2 className="mt-2">Password</h2>
          <input className="bg-white rounded-xl m-2"></input>
          <h2 className="mt-2">Confirm Password</h2>
          <input className="bg-white rounded-xl m-2"></input>
        </form>
      </div>
    </div>
  );
}
