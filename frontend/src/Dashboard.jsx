import './App-out.css';
import { Link } from 'react-router';

import { MdAttachMoney } from 'react-icons/md';
import { IoDocumentsOutline } from 'react-icons/io5';
import { BiTransferAlt } from 'react-icons/bi';
import { TitleBar } from './components/TitleBar';
import { InvestmentGraph } from './components/InvestmentGraph';
import { SavingGraph } from './components/SavingGraph';
import { AccountCard } from './components/AccountCard';
import { FaPlus } from 'react-icons/fa6';

export function Dashboard() {
  /* test data */
  const accounts = {
    first_name: ['john', 'steve', 'john', 'fred', 'greg'],
    last_name: ['doe', 'davies', 'jones', 'winkle', 'abraham'],
    balance: [125209, 523000, 251, 3102],
  };
  return (
    <>
      <TitleBar />

      <div className="user-board flex flex-row items-center border-b-2 border-orange-600 ">
        <div className="user-hello flex flex-col  w-1/4 m-4 text-2xl p-2 ">
          <h2 className="welcome-user">
            <span className="font-bold text-orange-600">Welcome,</span>
            {' ' +
              accounts.first_name[0].charAt(0).toUpperCase() +
              accounts.first_name[0].slice(1, accounts.first_name[0].length) +
              ' ' +
              accounts.last_name[0].charAt(0).toUpperCase() +
              accounts.last_name[0].slice(1, accounts.last_name[0].length)}
          </h2>
        </div>
        <div className="flex flex-row text-center items-center text-black  w-3/4 p-3 justify-evenly mx-auto">
          <Link to="/404">
            <div className="user-pins  border-2 border-orange-600 text-orange rounded-xl border-circle w-50 p-3">
              <div>
                <h3>Transfers</h3>
                <BiTransferAlt className="block mx-auto text-5xl" />
              </div>
            </div>
          </Link>
          <Link to="/404">
            <div className="user-pins border-2 border-orange-600 rounded-xl border-circle w-50 p-3">
              <div>
                <h3>Your Documents</h3>
                <IoDocumentsOutline className="block mx-auto text-5xl" />
              </div>
            </div>
          </Link>
          <Link to="/404">
            <div className="user-pins border-2  border-orange-600 rounded-xl border-circle  w-50 p-3">
              <div>
                <h3>Loans</h3>
                <MdAttachMoney className="block mx-auto text-5xl" />
              </div>
            </div>
          </Link>
          <Link to="/404">
            <div className="user-pins  border-2 border-orange-600 rounded-xl border-circle w-50 p-3">
              <div>
                <h3>New Account</h3>
                <FaPlus className="block mx-auto text-5xl" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex flex-row justify-evenly ">
        <div className="accounts justify-center w-1/3">
          <h1 className="p-2 m-4 font-bold text-3xl">Your accounts</h1>

          <AccountCard />
          <AccountCard />
        </div>

        <div className="flex flex-col w-1/3  rounded-2xl">
          <h1 className="p-2 m-4 font-bold text-3xl">Your Savings</h1>
          <div className="border-2 p-4 mr-2 border-orange-600 rounded-2xl flex justify-center">
            <SavingGraph />
          </div>
          <h2 className="text-xl text-center font-semibold p-2">Total</h2>
          <h3 className="text-2xl text-center p-2">£700</h3>
        </div>

        <div className="flex flex-col w-1/3 mr-10 rounded-2xl ">
          <h1 className="p-2 m-4 font-bold text-3xl ">Your Investments</h1>
          <div className="border-2 p-4 ml-2 border-orange-600 rounded-2xl flex justify-center">
            <InvestmentGraph />
          </div>
          <h2 className="text-xl text-center font-semibold p-2">Total</h2>
          <h3 className="text-2xl text-center p-2">£700</h3>
        </div>
      </div>
    </>
  );
}
