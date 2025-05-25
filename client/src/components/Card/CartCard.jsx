import React from "react";
import { Trash2 } from 'lucide-react';

const CartCard = () => {
  return (
    <div>
      <h1 className="text-xl font-bold">ตะกร้าสินค้า</h1>
      {/* Border */}
      <div className="border p-2">
        {/* Card */}
        <div className="bg-white p-2 rounded-md shadow-md">
          {/* Row 1 */}
          <div className="flex justify-between mb-2">
            {/* Left */}
            <div className="flex gap-2 items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                No Image
              </div>
              <div>
                <p className="font-bold">Title</p>
                <p className="text-sm">Description</p>
              </div>
            </div>
            {/* Right */}
            <div className="text-red-600 p-2"><Trash2 /></div>
          </div>
          {/* Row 2 */}
          <div className="flex justify-between">
            {/* Left */}
            <div className="border rounded-sm px-2 py-1">
              <button className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-red-300">-</button>
              <span className="px-2">1</span>
              <button className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-blue-300">+</button>
            </div>
            {/* Right */}
            <div className="font-bold text-blue-500">
              price : 1,000
            </div>
          </div>
        </div>
        {/* Total */}
        <div className="flex justify-between px-2">
          <span>รวม</span>
          <span>5,000</span>
        </div>
        {/* Button */}
        <button className="mt-4 bg-green-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-700">ดำเนินการชำระเงิน</button>
      </div>
    </div>
  );
};

export default CartCard;
