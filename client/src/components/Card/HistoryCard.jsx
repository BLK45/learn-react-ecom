import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const HistoryCard = () => {
  const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "productName", headerName: "สินค้า", flex: 2 },
  {
    field: "price",
    headerName: "ราคา",
    type: "number",
    valueFormatter: (params) => `${params.value?.toFixed(2)} บาท`,
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "จำนวน",
    type: "number",
    flex: 1,
  },
  {
    field: "total",
    headerName: "รวม",
    flex: 1.2,
  },
];


  const rows = [
    { id: 1, productName: "เสื้อยืด", price: 250, quantity: 2 },
    { id: 2, productName: "กางเกงยีนส์", price: 900, quantity: 1 },
    { id: 3, productName: "รองเท้า", price: 1500, quantity: 1 },
    { id: 4, productName: "หมวก", price: 300, quantity: 3 },
    { id: 5, productName: "กระเป๋า", price: 800, quantity: 2 },
  ];


  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ประวัติการสั่งซื้อ</h1>

      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm">วันที่สั่งซื้อ</p>
            <p className="font-bold">11 มิถุนายน 2025</p>
          </div>
          <div>
            <p className="text-sm">สถานะ</p>
            <p className="font-bold text-green-600">จัดส่งแล้ว</p>
          </div>
        </div>

        <Paper sx={{ height: 400, width: "100%", mb: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>

        <div className="text-right font-bold text-lg">
          ราคารวมสุทธิ: 5000 บาท
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
