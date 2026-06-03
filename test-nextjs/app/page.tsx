"use client";

import { useState } from "react";
import SlotMachine from "../components/SlotMachine";
import DepositForm from "../components/DepositForm";

export default function Home() {
  const [balance, setBalance] = useState(50000);
  const [showDepositForm, setShowDepositForm] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      {showDepositForm ? (
        <DepositForm 
          onCancel={() => setShowDepositForm(false)}
          onSuccess={(amount) => {
            // Khi nạp thành công, cộng tiền và đóng form
            setBalance((prev) => prev + amount);
            setShowDepositForm(false);
          }}
        />
      ) : (
        <SlotMachine 
          balance={balance}
          onSpinCost={(cost) => setBalance((prev) => prev - cost)}
          onOpenDeposit={() => setShowDepositForm(true)}
        />
      )}
    </main>
  );
}