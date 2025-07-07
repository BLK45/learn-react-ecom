import React, { useEffect, useState } from "react";
import { getListAllUsers } from "./../../api/admin";
import useEcomStore from "./../../store/ecom-store";

const TableUser = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(users)

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>Email</th>
            {/* <th>วันที่แก้ไขล่าสุด</th> */}
            <th>สิทธิ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((el, i) => (
            <tr key={el.id}>
              <td>{i + 1}</td>
              <td>{el.email}</td>
              {/* <td>{el.updated}</td> */}
              <td>{el.role}</td>
              <td>{el.enabled ? "Active" : "Inactive"}</td>
              <td>action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
