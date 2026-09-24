import { useState } from 'react';
import { Link, redirect, Form } from 'react-router';
import { TitleBarOut } from './components/TitleBarOut';

export async function user_signup({ request }) {
  const signup_data = await request.formData();
  const email = signup_data.get('email');
  const confirmed_email = signup_data.get('confirmed-email');
  const dob = signup_data.get('dob');
  const password = signup_data.get('password');
  const confirmed_pass = signup_data.get('confirm-password');

  if (password !== confirmed_pass) {
    return { error: 'Passwords do not match' };
  }
  if (email !== confirmed_email) {
    return { error: 'Emails do not match' };
  }

  try {
    const backend_call = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, dob, password: confirmed_pass }),
      }
    );
    if (!backend_call.ok) {
      throw new Error(`Response status: ${backend_call.status}`);
    }
    return redirect('/dashboard');
  } catch (e) {
    console.error(e.message);
    return { error: 'Something went wrong. Please try again.' };
  }
}

export function Signup() {
  const [email, setEmail] = useState('');
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailsMatch = confirmedEmail === '' || email === confirmedEmail;
  const passwordsMatch = confirmPassword === '' || password === confirmPassword;
  const passwordValidate =
    password.length >= 8 &&
    /\d{2,}/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
  const validated = emailsMatch && passwordsMatch && passwordValidate;

  const inputBase =
    'hover:bg-zinc-800 hover:text-orange-600 text-zinc-800 rounded-md p-1 pl-2';

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <TitleBarOut />
      <div className="flex flex-row justify-center pt-15 bg-[url(building.jpg)] bg-cover mt-25 w-3/5 mx-auto rounded-sm">
        <div className="flex flex-col justify-center items-center border-4 border-orange-600 text-white bg-fuschia w-2/7 bg-orange-600/90 rounded-md mb-5 mt-5 p-5 font-semibold">
          <h1 className="text-2xl font-bold">Register Now</h1>
          <Form
            method="post"
            className="flex flex-col items-center mb-2"
            action="/new-signup"
          >
            <label className="mt-2">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputBase} bg-white`}
            />

            <label className="mt-4">Confirm Email*</label>
            <input
              name="confirmed-email"
              value={confirmedEmail}
              onChange={(e) => setConfirmedEmail(e.target.value)}
              className={`${inputBase} ${emailsMatch ? 'bg-white' : 'bg-red-600'}`}
              required
            />

            <label className="mt-4">Date of Birth*</label>
            <input
              name="dob"
              className={`${inputBase} bg-white`}
              type="date"
              required
            />

            <label className="mt-4">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              className={`${inputBase} ${!passwordTouched ? 'bg-white' : passwordValidate ? 'bg-white' : 'bg-red-600'}`}
            />

            <label className="mt-4">Confirm Password*</label>
            <input
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${inputBase}  ${passwordsMatch ? 'bg-white' : 'bg-red-600'}`}
            />

            <button
              type="submit"
              disabled={!validated}
              className="rounded-xl bg-white hover:bg-zinc-800 hover:text-orange-600 text-zinc-800 p-3 mt-5 w-2/4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Up
            </button>
          </Form>
        </div>

        <div>
          <div className="flex flex-col items-center m-5 p-5 bg-zinc-800/90 text-white rounded-md">
            <h1 className="text-2xl font-semibold">Already have an account?</h1>
            <Link to={'/login'}>
              <button
                disabled={!validated}
                type="button"
                className="p-3 plr mt-5 bg-orange-600 hover:bg-white hover:text-zinc-800 font-semibold rounded-lg px-5"
              >
                Login
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center text-center m-5 p-5 bg-zinc-800/90 text-white rounded-md">
            <h2 className="font-semibold">Password</h2>
            <ul className="items-center">
              <li>must be at least 8 characters</li>
              <li>must include at least 1 symbol and 2 numbers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
