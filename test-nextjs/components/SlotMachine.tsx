"use client";
import { useState, useRef } from "react";

interface SlotMachineProps {
  balance: number;
  onSpinCost: (cost: number) => void;
  onOpenDeposit: () => void;
}

export default function SlotMachine({ balance, onSpinCost, onOpenDeposit }: SlotMachineProps) {
  const symbols = ["🍒", "🍋", "🔔", "💎", "🍉"];
  const [slots, setSlots] = useState(["💎", "💎", "💎"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState("SẮP NỔ RỒI, GỠ TIẾP ĐI");
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSpin = () => {
    if (isSpinning) return; 

    if (balance < 10000) {
      setMessage("Hết tiền rồi! Nạp thêm đi");
      return;
    }

    onSpinCost(10000);
    setIsSpinning(true);
    setMessage("Đang quay...");

    spinIntervalRef.current = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 50);

    setTimeout(() => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);

      const firstTwo = symbols[Math.floor(Math.random() * symbols.length)];
      let lastOne = symbols[Math.floor(Math.random() * symbols.length)];
      
      while (lastOne === firstTwo) {
        lastOne = symbols[Math.floor(Math.random() * symbols.length)];
      }

      setSlots([firstTwo, firstTwo, lastOne]);
      setIsSpinning(false);
      setMessage("CÒN THỞ CÒN GỠ, TIẾP ĐI");
    }, 2000);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border-4 border-yellow-500 text-center max-w-md w-full">
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-yellow-400 uppercase tracking-widest text-left leading-tight">
          Siêu Cấp<br/>Nổ Hũ
        </h1>
        <div className="bg-gray-900 p-3 rounded-xl border border-green-500 text-right shadow-inner">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Số dư</p>
          <p className="text-2xl font-bold text-green-400">
            {balance.toLocaleString('vi-VN')}đ
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-center mb-8 bg-black p-4 rounded-xl shadow-inner border border-gray-700 overflow-hidden">
        {slots.map((symbol, index) => (
          <div 
            key={index} 
            className={`text-6xl bg-white w-24 h-24 flex items-center justify-center rounded-lg shadow-md transition-all duration-75
              ${isSpinning ? 'blur-[2px] scale-y-110 text-gray-400' : 'blur-0 scale-y-100 text-black'}`}
          >
            {symbol}
          </div>
        ))}
      </div>

      <p className="text-lg text-yellow-300 mb-8 font-medium h-8">{message}</p>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleSpin}
          disabled={isSpinning || balance < 10000}
          className="bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-extrabold py-4 px-10 rounded-full text-2xl transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full shadow-lg"
        >
          {isSpinning ? "ĐANG QUAY..." : "QUAY (10.000đ)"}
        </button>

        <button 
          onClick={onOpenDeposit} 
          disabled={isSpinning}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition w-full border border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Nạp tiền qua Bank
        </button>
      </div>
    </div>
  );
}