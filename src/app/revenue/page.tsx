import { TransactionsProvider } from "@/contexts/transactions.context";
import Transactions from "./transactions";
import Wallet from "./wallet";

export default function Lib() {
  return (
    <div className="h-screen w-full p-16 pt-12 flex flex-col items-center space-y-4">
      <TransactionsProvider>
        <Wallet />
        <Transactions />
      </TransactionsProvider>
    </div>
  );
}
