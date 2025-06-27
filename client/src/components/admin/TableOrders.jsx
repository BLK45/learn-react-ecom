import React, { useEffect, useState } from "react";
import useEcomStore from "./../../store/ecom-store";
import { getOrdersAdmin } from "../../api/admin";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [order, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, [token]);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border">
              <th>ลำดับ</th>
              <th>ผู้ใช้งาน</th>
              <th>สินค้า</th>
              <th>รวม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => {
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index+1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>
                  <td className="px-2 py-4">

                        {
                            item.products?.map((product, index)=>
                                <li key={index}>
                                    {product.product.title}
                                    <span>{product.count * product.price}</span>
                                </li>
                            )
                        }

                  </td>
                  <td>{item.cartTotal}</td>
                  <td>{item.orderStatus}</td>
                  <td>action</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
