import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  NOTIFIKASI_7_EXCELCOM,
  GET_BARANG_TRANSAKSI_JUAL_EXCELCOM,
} from "../../../../utils/BaseUrl";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { CheckIcon, PhoneIcon, PrinterIcon } from "@heroicons/react/24/outline";

function Notifikasi7Excelcom() {
  const tableRef = useRef(null);
  const [notifikasis, setNotifikasi] = useState([]);
  const [barang, setBarang] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${NOTIFIKASI_7_EXCELCOM}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setNotifikasi(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // Fetch additional data for each notification, in this case barang information
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
        notifikasis.map(async (laporan) => {
          const barangData = await barangTransaksi(laporan.idTransaksi);
          return barangData;
        })
      );
      setBarang(barangList);
    };

    fetchBarangTransaksi();
  }, [notifikasis]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (notifikasis && notifikasis.length > 0) {
      // Initialize DataTable only when notifikasis data is available
      initializeDataTable();
    }
  }, [notifikasis]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            KETERANGAN NOTIFIKASI 7 HARI EXCELCOM
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
            <a href="/notifikasi_7_excelcom">
              <span>Notifikasi 7 Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
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
                    Nama Customer
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Salesman
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {notifikasis.length > 0 ? (
                  notifikasis.map((penjualan, index) => {
                    const barangLaporan = barang[index] || [];
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {penjualan.created_date}
                        </td>
                        <td className="text-sm w-[15%] py-2 px-3">
                          {penjualan.noFaktur}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {penjualan.customer.nama_customer}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {penjualan.salesman.namaSalesman}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.barcodeBarang}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3 flex items-center justify-center">
                          <div className="flex flex-row gap-3">
                            <IconButton size="md" color="light-blue">
                              <PrinterIcon className="w-6 h-6 white" />
                            </IconButton>
                            <IconButton size="md" color="red" type="button">
                              <CheckIcon className="w-6 h-6 white" />
                            </IconButton>
                            <IconButton size="md" color="orange">
                              <IconButton
                                size="md"
                                color="orange"
                                onClick={() => {
                                  const phone = encodeURIComponent(
                                    penjualan.customer.telp
                                  ); // Mengkodekan nomor telepon
                                  const message = encodeURIComponent(
                                    `Selamat pagi kak ${penjualan.customer.nama_customer}%0APerkenalkan saya ${penjualan.salesman.namaSalesman} dari Excellent Computer Semarang ABagaimana kabarnya Kak? Semoga selalu dalam lindunganNya Aamiin`
                                  );
                                  window.open(
                                    `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
                                  );
                                }}
                              >
                                <PhoneIcon className="w-6 h-6 white" />
                              </IconButton>
                            </IconButton>
                          </div>
                        </td>{" "}
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
            KONFIRMASI NOTIFIKASI 30 HARI EXCELCOM
          </Typography>

          <div className="rounded my-5 overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto overflow-auto"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Tanggal Konfirmasi
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama Customer</th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama Salesman</th>
                  <th className="text-sm py-2 px-3 font-semibold">Keterangan</th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {notifikasis.length > 0 ? (
                  notifikasis.map((penjualan, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{penjualan.created_date}</td>
                      <td className="text-sm w-[15%] py-2 px-3">
                        {penjualan.noFaktur}
                      </td>
                      <td className="text-sm py-2 px-3">{penjualan.namaCustomer}</td>
                      <td className="text-sm py-2 px-3">{penjualan.namaSalesman}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-row gap-3">
                          <IconButton size="md" color="light-blue">
                            <PrinterIcon className="w-6 h-6 white" />
                          </IconButton>
                          <IconButton size="md" color="red" type="button">
                            <CheckIcon className="w-6 h-6 white" />
                          </IconButton>
                          <IconButton size="md" color="orange">
                            <PhoneIcon className="w-6 h-6 white" />
                          </IconButton>
                        </div>
                      </td>{" "}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
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

export default Notifikasi7Excelcom;
