  import { CiCircleMore } from "react-icons/ci";



  export function AccountCard(){

      const accounts = {
    first_name: ["john", "steve", "john", "fred", "greg"],
    last_name: ["doe", "davies", "jones", "winkle", "abraham"],
    balance: [125209, 523000, 251, 3102],
  };       
       
return (
       <div className="flex flex-row justify-between space-between m-4 bg-linear-to-bl rounded-xl text-white from-orange-600 to-yellow-600">
            <div className="user-account flex flex-col m-4 p-3 w-2/4 ">
              <h2 className="p-2">Current Account</h2>
              <h2 className="p-2 text-3xl font-semibold">21406456</h2>
              <h3 className="pb-2 pl-2 text-2xl font-semibold">20-42-20</h3>
              <h2 className="pt-2 pl-2 text-2xl">Balance: </h2>
              <h1 className="p-2 text-2xl font-bold">
                £
                {accounts.balance[0].toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}{" "}
              </h1>
            </div>
            <CiCircleMore className="text-4xl justify-end m-3" />
          </div>

  )}
