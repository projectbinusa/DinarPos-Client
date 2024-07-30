import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { CheckIcon, PhoneIcon, PrinterIcon } from "@heroicons/react/24/outline";
import {
  GET_BARANG_TRANSAKSI_JUAL_EXCELCOM,
  NOTIFIKASI_120_EXCELCOM,
  NOTIFIKASI_KONFIRMASI_120_EXCELCOM,
} from "../../../../utils/BaseUrl";

function Notifikasi120Excelcom() {
  const tableRef = useRef(null);
  const tableRef2 = useRef(null);
  const [notifikasis, setNotifikasi] = useState([]);
  const [konfirmasis, setKonfirmasis] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const initializeDataTable2 = () => {
    if ($.fn.DataTable.isDataTable(tableRef2.current)) {
      $(tableRef2.current).DataTable().destroy();
    }

    $(tableRef2.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${NOTIFIKASI_120_EXCELCOM}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setNotifikasi(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // GET ALL KONFIRMASI
  const getAllKonfirmasi = async () => {
    try {
      const response = await axios.get(
        `${NOTIFIKASI_KONFIRMASI_120_EXCELCOM}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setKonfirmasis(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
    getAllKonfirmasi();
  }, []);

  useEffect(() => {
    if (notifikasis && notifikasis.length > 0) {
      initializeDataTable();
    }
  }, [notifikasis]);

  useEffect(() => {
    if (konfirmasis && konfirmasis.length > 0) {
      initializeDataTable2();
    }
  }, [konfirmasis]);

  // GET BARANG
  const [barang, setBarang] = useState([]);

  const barangTransaksi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${GET_BARANG_TRANSAKSI_JUAL_EXCELCOM}?id_transaksi=${transactionId}`,
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
        notifikasis.map(async (notif) => {
          const barangData = await barangTransaksi(notif.idTransaksi);
          return barangData;
        })
      );
      setBarang(barangList);
    };

    fetchBarangTransaksi();
  }, [notifikasis]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            KETERANGAN NOTIFIKASI 120 HARI EXCELCOM
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
            <a href="/notifikasi_120_excelcom">
              <span>Notifikasi 120 Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="rounded my-5 p-2 w-full overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full overflow-auto"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-3 font-semibold">No Faktur</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Customer
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Salesman
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {notifikasis.length > 0 ? (
                  notifikasis.map((down, index) => {
                    const dataBrg = barang[index] || [];

                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {down.created_date}
                        </td>
                        <td className="text-sm  py-2 px-3">{down.noFaktur}</td>
                        <td className="text-sm py-2 px-3">
                          {down.customer.nama_customer}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {down.salesman.namaSalesman}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {dataBrg.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.namaBarang}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3 flex gap-2 items-center justify-center">
                          <a
                            href={"/print_histori_excelcom/" + down.idTransaksi}
                            target="_blank"
                          >
                            <IconButton size="md" color="light-blue">
                              <PrinterIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <a
                            href={
                              "/konfirmasi_120_excelcom/" + down.idTransaksi
                            }
                          >
                            <IconButton size="md" color="red" type="button">
                              <CheckIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <IconButton
                            size="md"
                            color="orange"
                            onClick={() => {
                              const phone = encodeURIComponent(
                                down.customer.telp
                              );
                              const message = encodeURIComponent(
                                `Hallo kak ${down.customer.nama_customer} Perkenalkan saya ${down.salesman.namaSalesman} dari Excellent Computer Semarang Bagaimana kabarnya Kak? Semoga selalu dalam lindunganNya Aamiin`
                              );
                              window.open(
                                `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
                              );
                            }}
                          >
                            <PhoneIcon className="w-6 h-6 white" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })
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

        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <Typography variant="lead" className="uppercase">
            KONFIRMASI NOTIFIKASI 120 HARI EXCELCOM
          </Typography>

          <div className="rounded my-5 p-2 w-full overflow-auto">
            <table
              id="example_data2"
              ref={tableRef2}
              className="rounded-sm table-auto w-full overflow-auto"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    No Faktur
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Tanggal Konfirmasi
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Customer
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Salesman
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Keterangan
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold w-[15%]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {konfirmasis.length > 0 ? (
                  konfirmasis.map((row, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{row.noFaktur}</td>
                      <td className="text-sm py-2 px-3">
                        {formatDate(row.tanggalKonfirmasi120)}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {row.customer.nama_customer}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {row.salesman.namaSalesman}
                      </td>
                      <td className="text-sm py-2 px-3">{row.ket120Hari}</td>
                      <td className="text-sm py-2 px-3 flex flex-col gap-2">
                        <a
                          href={"/print_histori_excelcom/" + row.idTransaksi}
                          target="_blank"
                        >
                          <IconButton size="md" color="light-blue">
                            <PrinterIcon className="w-6 h-6 white" />
                          </IconButton>
                        </a>
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

export default Notifikasi120Excelcom;
