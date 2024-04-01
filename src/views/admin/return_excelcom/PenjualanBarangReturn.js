import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { API_RETURN_EXCELCOM } from "../../../utils/BaseUrl";

function PenjualanBarangReturn() {
  const tableRef = useRef(null);
  const [penjualans, setPenjualan] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_RETURN_EXCELCOM}/barang_penjualan`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setPenjualan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (penjualans && penjualans.length > 0) {
      initializeDataTable();
    }
  }, [penjualans]);
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            data transaksi penjualan barang return excelcom
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_admin" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/penjualan_return_excelcom">
              <span>Penjualan Barang Return Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="rounded my-5 overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto overflow-auto"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-3 font-semibold">No Faktur</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Salesman
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Customer
                  </th>
                </tr>
              </thead>
              <tbody>
                {penjualans.length > 0 ? (
                  penjualans.map((penjualan, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">
                        {penjualan.created_date}
                      </td>
                      <td className="text-sm w-[15%] py-2 px-3">
                        {penjualan.transaksi.noFaktur}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {penjualan.barcodeBarang}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {penjualan.namaBarang}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {penjualan.salesman.namaSalesman}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {penjualan.transaksi.customer.nama_customer}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-sm text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default PenjualanBarangReturn;
