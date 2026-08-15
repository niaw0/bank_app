import { Link, redirect, Form } from 'react-router';
import { TitleBarOut } from './components/TitleBarOut';

export async function user_login({ request }) {
  const signup_data = await request.formData();
  const email = signup_data.get('email');
  const dob = signup_data.get('dob');
  const password = signup_data.get('password');

  try {
    const backend_call = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          dob: dob,
          password: password,
        }),
      }
    );
    if (!backend_call.ok) {
      throw new Error(`Response status: ${backend_call.status}`);
    }
    return redirect('/dashboard');
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

export function Login() {
  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <TitleBarOut />
      <div className="flex flex-row justify-center pt-15 bg-[url(atm.jpg)] bg-cover mt-25 w-3/5 mx-auto  rounded-sm ">
        <div className="flex flex-col justify-center items-center border-4 border-orange-600  text-white bg-fuschia w-2/7 bg-orange-600/90 rounded-md mb-5 mt-5 p-5  font-semibold">
          <h1 className="text-2xl font-bold">Login</h1>
          <Form
            method="post"
            className="flex flex-col items-center"
            action="/user-login"
          >
            <h2 className="mt-4 ml-2">Email</h2>
            <input
              name="email"
              type="email"
              className="  bg-white hover:bg-zinc-800 hover:text-orange-600 text-zinc-800 rounded-md  p-1 pl-2"
            ></input>

            <h2 className="mt-4 ml-2">Date of Birth*</h2>
            <input
              name="dob"
              className=" bg-white hover:bg-zinc-800 hover:text-orange-600 text-zinc-800  rounded-md p-1"
              type="date"
              required
            ></input>
            <h2 className="mt-4 ml-2">Password</h2>
            <input
              name="password"
              type="password"
              className="password bg-white hover:bg-zinc-800 hover:text-orange-600 text-zinc-800 rounded-md p-1 pl-2 "
            ></input>

            <button
              type="submit"
              className=" rounded-xl bg-white hover:bg-zinc-800 hover:text-orange-600  text-zinc-800 p-3 mt-5 w-2/4"
            >
              Sign Up
            </button>
          </Form>
        </div>
        <div className="flex flex-col items-center m-5 p-5 bg-zinc-800/90  h-1/3 text-white rounded-md ">
          <h1 className=" text-2xl font-semibold"> New here?</h1>
          <Link to={'/signup'}>
            <button
              type="submit"
              className=" p-3 plr mt-5 bg-orange-600 hover:bg-white hover:text-zinc-800   font-semibold rounded-lg px-5"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
