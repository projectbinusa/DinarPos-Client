import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  API_BARANG_TRANSAKSI_INDENT,
  API_TRANSAKSI_INDENT_DINARPOS,
} from "../../../../utils/BaseUrl";
import { CheckIcon } from "@heroicons/react/24/outline";

function TransaksiIndentDinarpos() {
  const tableRef = useRef(null);
  const [datas, setdatas] = useState([]);

  //   const history = useHistory();

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_TRANSAKSI_INDENT_DINARPOS}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setdatas(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const [barang, setBarang] = useState([]);

  const barangTransaksi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${API_BARANG_TRANSAKSI_INDENT}?id=${transactionId}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("get all", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchBarangTransaksi = async () => {
      const barangList = await Promise.all(
        datas.map(async (data) => {
          const barangData = await barangTransaksi(data.id);
          return barangData;
        })
      );
      setBarang(barangList);
    };

    fetchBarangTransaksi();
  }, [datas]);

  useEffect(() => {
    if (datas && datas.length > 0) {
      initializeDataTable();
    }
  }, [datas]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Transaksi Indent Dinarpos
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/transaksi_indent_dinarpos">
              <span>Indent Dinarpos</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="block">
            <a href="/add_transaksi_indent_dinarpos">
              <Button variant="gradient" color="blue">
                Tambah
              </Button>
            </a>
          </div>
          <div className="rounded my-5 p-2 w-full overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                    No
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    No Faktur
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Nama Salesman
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Nama Customer
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Harga</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">QTY</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Total Harga Barang
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Total Belanja
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Total Keseluruhan
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((data, index) => {
                    const barangs = barang[index] || [];
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm px-2">{data.tanggal}</td>
                        <td className="text-sm px-2">{data.noFaktur}</td>
                        <td className="text-sm px-2">
                          {data.salesman.namaSalesman}
                        </td>
                        <td className="text-sm px-2">
                          {data.customer.nama_customer}
                        </td>
                        <td className="text-sm px-2">
                          {barangs.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.barcodeBarang}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm px-2">
                          {barangs.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.hargaBrng}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm px-2">
                          {barangs.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.qty}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm px-2">
                          {barangs.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.hargaBrng}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm px-2">{data.totalBelanja}</td>
                        <td className="text-sm px-2">{data.totalBelanja}</td>
                        <td className="text-sm p-2 text-center">
                          <a
                            href={
                              "/add_transaksi_from_transaksi_indent/" + data.id
                            }
                          >
                            <IconButton size="md" color="light-blue">
                              <CheckIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="12"
                      className="text-sm text-center capitalize py-2 bg-gray-100 "
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

export default TransaksiIndentDinarpos;
