import * as React from "react";
import { useState, useEffect } from "react";
import { getOrders } from "./../../api/user";
import useEcomStore from "./../../store/ecom-store";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrders(token);
  }, [token]);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>
      {/* คลุม */}
      <div>
        {/* Card */}
        {orders?.map((item, index) => {
          console.log(item)
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              {/* header */}
              <div className="flex justify-between">
                <div>
                  <p className="text-sm">Order date</p>
                  <p className="font-bold">{item.updated}</p>
                </div>
                <div>{item.orderStatus}</div>
              </div>
              {/* table */}
              <div>
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>สินค้า</th>
                      <th>ราคา</th>
                      <th>จำนวน</th>
                      <th>รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      item?.products.map((product, index)=>{
                        console.log(product)
                        return (
                          <tr>
                            <td>{product.product.title}</td>
                            <td>{product.product.price}</td>
                            <td>{product.count}</td>
                            <td>{product.count * product.product.price}</td>
                          </tr>
                        )
                      })
                    } 
                  </tbody>
                </table>
              </div>
              {/* total */}
              <div>
                <div className="text-right">
                  <p>ราคาสุทธิ</p>
                  <p>{item.cartTotal}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
