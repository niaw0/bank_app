import { Link, redirect, Form } from 'react-router';
import { TitleBarOut } from './components/TitleBarOut';

export async function user_signup({ request }) {
  const signup_data = await request.formData();
  const email = signup_data.get('email');
  const dob = signup_data.get('dob');
  const password = signup_data.get('password');
  const confirmed_pass = signup_data.get('confirm-password');

  if (password !== confirmed_pass) {
    const password_el = document.querySelector('.confirm-password');
    password_el.classList.remove('bg-white');
    password_el.classList.add('bg-red-600');
  }
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
          password: confirmed_pass,
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

export function Signup() {
  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <TitleBarOut />
      <div className="flex flex-row justify-center pt-15 bg-[url(building.jpg)] bg-cover mt-25 w-3/5 mx-auto  rounded-sm ">
        <div className="flex flex-col justify-center items-center border-4 border-orange-600  text-white bg-fuschia w-2/7 bg-orange-600/90 rounded-md mb-5 mt-5 p-5  font-semibold">
          <h1 className="text-2xl font-bold">Register Now</h1>
          <Form
            method="post"
            className="flex flex-col items-center"
            action="/new-signup"
          >
            <h2 className="mt-4 ml-2">Email</h2>
            <input
              name="email"
              type="email"
              className="  bg-white hover:bg-zinc-800 hover:text-orange-600 text-zinc-800 rounded-md  p-1 pl-2"
            ></input>
            <h2 className="mt-4 ml-2">Confirm Email*</h2>
            <input
              name="confirmed-email"
              className=" bg-white hover:bg-zinc-800 hover:text-orange-600 text-zinc-800  rounded-md p-1 pl-2"
              required
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
            <h2 className="mt-4 ml-2 ">Confirm Password*</h2>
            <input
              name="confirm-password"
              type="password"
              className="confirm-password bg-white hover:bg-zinc-800 hover:text-orange-600 text-zinc-800 rounded-md p-1  pl-2"
            ></input>
            <button
              type="submit"
              className=" rounded-xl bg-white hover:bg-zinc-800 hover:text-orange-600  text-zinc-800 p-3 mt-5 w-2/4"
            >
              Sign Up
            </button>
          </Form>
        </div>
        <div className="">
          <div className="flex flex-col items-center m-5 p-5 bg-zinc-800/90   text-white rounded-md ">
            <h1 className=" text-2xl font-semibold">
              {' '}
              Already have an account?
            </h1>
            <Link to={'/login'}>
              <button
                type="Signup"
                className=" p-3 plr mt-5 bg-orange-600 hover:bg-white hover:text-zinc-800  font-semibold rounded-lg px-5"
              >
                Signup
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center text-center m-5 p-5 bg-zinc-800/90   text-white rounded-md ">
            <h2 className="font-semibold">Password</h2>
            <ul className="items-center">
              <li>must be at least 8 characters </li>
              <li>must include at least 1 symbol and 2 numbers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
