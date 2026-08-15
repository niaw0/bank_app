import { Link } from 'react-router';
import { TitleBarOut } from './components/TitleBarOut';
import { useState } from 'react';
import './App-out.css';

export function Root() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [breakdown, setBreakdown] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const loanAmount = parseFloat(amount);
    const annualRate = parseFloat(rate / 100);
    const loanTerm = parseInt(months);

    if (
      isNaN(loanAmount) ||
      isNaN(annualRate) ||
      isNaN(loanTerm) ||
      loanTerm <= 0
    ) {
      return;
    }
    const monthlyRate = annualRate / 12;
    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / loanTerm;
    } else {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1);
    }
    const totalRepay = monthlyPayment * loanTerm;
    const totalInterest = totalRepay - loanAmount;

    setBreakdown({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalRepay: totalRepay.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };
  return (
    <>
      <div className="min-h-screen overflow-hidden bg-white dark:bg-zinc-800">
        <TitleBarOut />

        <div className="flex flex-row h-[70]  p-10 m-10 bg-[url(mountain2.jpg)] bg-cover bg-center">
          <div className="flex flex-row bg-black/50 rounded-xl w-1/3">
            <div className="flex flex-col justify-center  ">
              <h1 className="text-3xl ml-5 font-bold text-white">
                Get a free £200*
              </h1>
              <h1 className="text-1xl ml-5 mb-2 font-bold text-white">
                when you switch to us
              </h1>
              <div className=" ">
                <Link
                  to="/signup"
                  className="flex justify-center items-center ml-5 mt-5  bg-zinc-800 align-bottom hover:bg-orange-600 text-white w-2/3  p-2 rounded-2xl"
                >
                  <h2>Switch Today</h2>
                </Link>
              </div>
            </div>
            <img className="ml-15 w-1/3" src={'currswitch.png'}></img>
          </div>

          <div className="p-2 bg-black/40 justify-self-center ml-20 rounded-xl text-white w-2/5">
            <h1 className="m-2 p-2 mt-2 font-semibold text-2xl">
              Find out about our new credit card
            </h1>
            <p className="m-2  pl-2">
              0% interest for the first 6 months. 25% apr for each month
              thereafter.
              <br />
              <Link className="underline">terms & conditions</Link>
            </p>
            <Link
              to="/signup"
              className="flex justify-center items-center ml-3  bg-zinc-800 hover:bg-orange-600 text-white mr-2  p-2 rounded-2xl w-2/4"
            >
              <h2>Learn More</h2>
            </Link>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="p-10 ml-10  border-2  dark:text-white text-zinc-800 rounded-lg w-1/3">
            <h1 className="text-2xl font-semibold ">Loan Calculator</h1>
            <p className=" ">
              Check how much you can borrow with our low interest loans.
            </p>
            <div className="flex flex-row ">
              <form
                onSubmit={handleCalculate}
                className=" flex flex-col  text-zinc-800 dark:text-white border-2 border-orange-600 p-3 mt-2 rounded-lg w-1/2"
              >
                <h2 className=" font-semibold mt-2">Amount £</h2>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  className="border-2 dark:border-orange-600 border-zinc-800  hover:bg-orange-600 rounded-md p-2 mt-2 w-2/3"
                  placeholder="0-10,000"
                ></input>
                <h2 className="font-semibold pt-2">Rate %</h2>
                <input
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="border-2 dark:border-orange-600 border-zinc-800   hover:bg-orange-600 rounded-md p-2 mt-2 w-1/3"
                  placeholder="0-20%"
                  type="percentage"
                ></input>

                <h2 className=" font-semibold pt-2">Months</h2>
                <input
                  onChange={(e) => setMonths(e.target.value)}
                  value={months}
                  className="border-2 dark:border-orange-600 border-zinc-800 hover:bg-orange-600  rounded-md p-2 mt-2 w-1/3"
                  placeholder="0-58"
                ></input>

                <button className=" bg-orange-600 hover:bg-white text- text-zinc-800 rounded-lg p-2 mt-5 w-2/3 ">
                  Calculate
                </button>
              </form>

              <div className="flex m-3 flex-col  border-orange-600 text-white rounded-2xl   pl-2 w-1/2 ">
                <h2 className=" font-semibold mt-2">The Breakdown</h2>
                <h2 className="pt-2">Monthly Repayments</h2>
                <p className="font-semibold">
                  {' '}
                  £{breakdown?.monthlyPayment || 0.0}
                </p>
                <h2 className="pt-2">Total Interest</h2>
                <p className="font-semibold">
                  £{breakdown?.totalInterest || 0.0}
                </p>
                <h2 className="pt-2">Total Repayment</h2>
                <p className="font-semibold">£{breakdown?.totalRepay || 0.0}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-10 ml-10 space-y-2 rounded-lg bg-orange-600 text-white w-2/3 mx-auto mr-10">
            <h1 className="text-2xl font-bold ">About us</h1>
            <br />
            <h2 className="text-xl font-semibold pt-3">Who are we?</h2>
            <p>
              We are a intergalactic banking company who provide banking
              services to the general public in all solar systems since the
              start of time.
            </p>
            <br />
            <br />
            <h2 className="text-xl font-semibold pt-3">
              Our Mission Statement
            </h2>
            <p>
              We work to provide our customers with the greatest banking service
              they have received
            </p>
            <br />
            <br />
            <h2 className="text-xl font-semibold pt-3">Our Services</h2>
            <p>
              We provide fair current, saving and investment accounts for
              species 16+
            </p>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
