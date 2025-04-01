import { TransactionsProvider } from "@/contexts/transactions.context";
import Transactions from "./transactions";

export default function Lib() {
  return (
    <div className="h-screen w-full p-16 pt-8 flex flex-col items-center">
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </div>
  );
}
