import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { API_RETURN_DINARPOS } from "../../../utils/BaseUrl";

function PembelianBarangReturnDinar() {
  const tableRef = useRef(null);
  const [pembelians, setPembelian] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_RETURN_DINARPOS}/barang_pembelian`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setPembelian(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (pembelians && pembelians.length > 0) {
      initializeDataTable();
    }
  }, [pembelians]);
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            data transaksi pembelian barang return dinarpos
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
            <a href="/pembelian_return_dinarpos">
              <span>Pembelian Barang Return Dinarpos</span>
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
              <thead className="border-b-2">
                <tr>
                  <th className="py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="py-2 px-3 font-semibold">Tanggal</th>
                  <th className="py-2 px-3 font-semibold">No Faktur</th>
                  <th className="py-2 px-3 font-semibold">Barcode Barang</th>
                  <th className="py-2 px-3 font-semibold">Nama Barang</th>
                  <th className="py-2 px-3 font-semibold">Nama Suplier</th>
                </tr>
              </thead>
              <tbody>
                {pembelians.length > 0 ? (
                  pembelians.map((pembelian, index) => (
                    <tr key={index}>
                      <td className="w-[4%]">{index + 1}</td>
                      <td className="py-2 px-3">
                        {pembelian.barcode_pembelian}
                      </td>
                      <td className="w-[15%] py-2 px-3">{pembelian.unit}</td>
                      <td className="py-2 px-3">{pembelian.harga_beli}</td>
                      <td className="py-2 px-3">{pembelian.harga_jual}</td>
                      <td className="py-2 px-3">{pembelian.harga_jual}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center capitalize py-3 bg-gray-100"
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

export default PembelianBarangReturnDinar;
