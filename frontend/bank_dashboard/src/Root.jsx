import { Link } from "react-router";
import { TitleBar } from "./components/TitleBar";
import { useState } from "react";

export function Root() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
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
      <div className="min-h-screen overflow-hidden bg-white">
        <TitleBar />

        <div className="flex flex-col h-70 rounded-xl p-10 align-middle m-10 bg-[url(gold2.jpg)] bg-size-[auto_1200px] bg-center">
          <h1 className="text-3xl justify-self-center font-bold text-white">
            Modern banking
          </h1>
          <h1 className="text-1xl justify-self-center font-bold text-white">
            at a breeze
          </h1>
          <div className="flex flex-row justify-start">
            <Link
              to="/dashboard"
              className="flex justify-center items-center mt-5 bg-zinc-700 hover:bg-orange-600 text-white w-20 p-2 mr-2 rounded-2xl"
            >
              <h2 className="">Login</h2>
            </Link>
            <Link
              to="/dashboard"
              className="flex justify-center items-center mt-5 bg-zinc-700 hover:bg-orange-600 text-white w-20 ml-2 mr-2  p-2 rounded-2xl"
            >
              <h2>Sign Up</h2>
            </Link>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="p-10 ml-10  border-2 border-black rounded-xl w-1/3">
            <h1 className="text-2xl font-semibold ">
              Loan Calculator
            </h1>
            <p className=" ">
              Check how much you can borrow with our low interest loans.
            </p>
            <div className="flex flex-row">
              <form
                onSubmit={handleCalculate}
                className=" flex flex-col border-2 border-white  rounded-2xl w-1/2"
              >
                <h2 className=" font-semibold pt-2">
                  Amount £
                </h2>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  className="border-2 border-slate-700 text-slate-700 hover:bg-orange-200 rounded-xl p-2 mt-2 w-2/3"
                  placeholder="0-10,000"
                ></input>
                <h2 className="font-semibold pt-2">
                  Rate %
                </h2>
                <input
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="border-2 border-slate-700 text-slate-700  hover:bg-orange-200 rounded-xl p-2 mt-2 w-1/3"
                  placeholder="0-20%"
                  type="percentage"
                ></input>

                <h2 className=" font-semibold pt-2">
                  Months
                </h2>
                <input
                  onChange={(e) => setMonths(e.target.value)}
                  value={months}
                  className="border-2 border-slate-700 hover:bg-orange-200 text-slate-700 rounded-xl p-2 mt-2 w-1/3"
                  placeholder="0-58"
                ></input>

                <button
                  className="bg-slate-700 hover:bg-orange-600 text-white rounded-xl p-2 mt-5 w-2/3 "
                >
                  Calculate
                </button>
              </form>

              <div className="flex m-2 flex-col border-2 border-white text-black rounded-2xl p-2 w-1/2 ">
                <h2 className=" font-semibold pt-2">The Breakdown</h2>
                <h2 className="pt-2">Monthly Repayments</h2>
                <p className="font-semibold"> £{breakdown?.monthlyPayment || 0.00}</p>
                <h2 className="pt-2">Total Interest</h2>
                <p className="font-semibold">£{breakdown?.totalInterest || 0.00}</p>
                <h2 className="pt-2">Total Repayment</h2>
                <p className="font-semibold">£{breakdown?.totalRepay || 0.00}</p>
              </div> 
            </div>
          </div>

          <div className="p-10 ml-10 mb-30 border-2 rounded-xl w-2/3 mr-10">
            <h1 className="text-2xl font-bold ">About us</h1>
            <br className="pb-2 border-black" />
            <h2 className="text-xl font-semibold">Who are we?</h2>
            <p>
              We are a global banking company, providing banking services to the
              general public in all galaxies since 100 B.C.E
            </p>
            <br />
            <br className="pb-2 border-black" />
            <h2 className="text-xl font-semibold">Our Mission Statement</h2>
            <p>
              We work to provide our customers with the greatest banking service
              they have received
            </p>
            <br />
            <br className="pb-2 border-black" />
            <h2 className="text-xl font-semibold">Our Services</h2>
            <p>
              We provide fair current, saving and investment accounts for humans
              16+
            </p>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
