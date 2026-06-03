"use client";
import { useState } from "react";

interface DepositFormProps {
  onCancel: () => void;
  onSuccess: (amount: number) => void;
}

export default function DepositForm({ onCancel, onSuccess }: DepositFormProps) {
  const [amount, setAmount] = useState(50000); 
  const [isSuccess, setIsSuccess] = useState(false);

  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const isAccountMatch = bank === "mbb" && accountNumber === "0383533171";
  const showInvalidError = accountNumber.length > 0 && !isAccountMatch;

  const handleFakePayment = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!isAccountMatch) {
      alert("Tài khoản không hợp lệ. Vui lòng kiểm tra lại!");
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000); 
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-black text-center flex flex-col items-center gap-4 animate-fade-in">
        {}
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-md animate-bounce">
          ✓
        </div>
        
        <h2 className="text-2xl font-extrabold text-green-600 uppercase tracking-wide">
          Giao Dịch Thành Công
        </h2>
        
        <p className="text-gray-500 text-sm">
          Hệ thống đã ghi nhận khoản nạp của bạn
        </p>

        {}
        <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100 my-2 text-left flex flex-col gap-2">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500 text-sm">Số tiền nạp:</span>
            <span className="font-bold text-green-600 text-lg">+{amount.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-gray-500 text-sm">Nguồn nhận:</span>
            <span className="font-semibold text-gray-800">MB Bank - TRAN HOANG DUNG</span>
          </div>
        </div>

        {}
        <button
          onClick={() => onSuccess(amount)} 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg shadow-green-200 text-lg mt-2"
        >
          Quay lại nhận xèng
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-black">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600 uppercase tracking-wide">Cổng Thanh Toán</h2>
        <p className="text-gray-500 text-sm mt-1">Nạp tiền vào tài khoản</p>
      </div>

      <form onSubmit={handleFakePayment} className="flex flex-col gap-4">
        
        {}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn Số Tiền Nạp</label>
          <select 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 font-medium text-gray-800"
            disabled={isProcessing}
          >
            <option value={10000}>10.000đ (Hơi ít bạn ơi)</option>
            <option value={20000}>20.000đ</option>
            <option value={50000}>50.000đ (Khuyên dùng)</option>
            <option value={100000}>100.000đ</option>
            <option value={200000}>200.000đ</option>
            <option value={500000}>500.000đ (Ngon luôn)</option>
          </select>
        </div>

        {}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn Ngân Hàng</label>
          <select 
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 transition"
            disabled={isProcessing}
          >
            <option value="">-- Chọn ngân hàng --</option>
            <option value="vcb">Vietcombank</option>
            <option value="tcb">Techcombank</option>
            <option value="mbb">MB Bank</option>
            <option value="vtb">VietinBank</option>
            <option value="bidv">BIDV</option>
          </select>
        </div>

        {}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Số Tài Khoản</label>
          <input 
            type="text" 
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="VD: 0383533171"
            className={`w-full border rounded-lg p-3 outline-none focus:ring-1 transition bg-gray-50
              ${showInvalidError 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : isAccountMatch 
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
            disabled={isProcessing}
          />
        </div>

        {}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tên Chủ Tài Khoản</label>
          <div 
            className={`w-full border rounded-lg p-3 transition-all duration-300
              ${isAccountMatch ? 'bg-green-50 border-green-400 text-green-700' : 
                showInvalidError ? 'bg-red-50 border-red-400 text-red-600' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
          >
            {isAccountMatch ? (
              <span className="font-bold flex items-center gap-2">✅ TRAN HOANG DUNG</span>
            ) : showInvalidError ? (
              <span className="font-medium flex items-center gap-2">Tài khoản không tồn tại</span>
            ) : (
              <span className="italic text-sm">Vui lòng nhập ngân hàng và STK...</span>
            )}
          </div>
        </div>

        {}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isProcessing || !isAccountMatch}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? <span className="animate-pulse">Đang xử lý...</span> : "Thanh Toán"}
          </button>
        </div>
      </form>
    </div>
  );
}