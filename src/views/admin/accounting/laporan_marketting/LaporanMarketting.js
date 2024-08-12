import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import $ from "jquery";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { API_LAPORAN_MARKETING, API_PERSEDIAN_EXPORT, GET_BARANG_TRANSAKSI_JUAL_EXCELCOM } from "../../../../utils/BaseUrl";
import "datatables.net";
import axios from "axios";
import Swal from "sweetalert2";
import { PrinterIcon } from "@heroicons/react/24/outline";

function LaporanMarketting() {
  const tableRef = useRef(null);
  const [laporans, setLaporan] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    setTimeout(() => {
      if (tableRef.current) {
        $(tableRef.current).DataTable({
          destroy: true,
        });
      }
    }, 0);
  };
  
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_LAPORAN_MARKETING}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      console.log("Data yang diterima dari API:", response.data);
      setLaporan(response.data);
    } catch (error) {
      console.error("Error saat mengatur permintaan:", error);
      setLaporan([]);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (laporans.length > 0) {
      initializeDataTable();
    }
  }, [laporans]);

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
        laporans.map(async (laporan) => {
          const barangData = await barangTransaksi(laporan.idTransaksi);
          return barangData;
        })
      );
      setBarang(barangList);
    };

    fetchBarangTransaksi();
  }, [laporans]);


  // EXPORT LAPORAN MARKETING
  const exportLaporanMarketting = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_PERSEDIAN_EXPORT}/export?PersediaanToExcel`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          responseType: "blob",
        }
      );

      // Handle the blob response and download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "PersediaanToExcel.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "Export Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error saat mengunduh file:",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Laporan Marketting
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/laporan_marketting">
              <span>Laporan Marketting</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <Button className="mt-5" color="blue" type="button" onClick={exportLaporanMarketting}>
            Export Data Persediaan
          </Button>

          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table id="example_data" ref={tableRef} className="rounded-sm table-auto w-full overflow-x-auto">
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">No Faktur</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Nama Salesman</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Nama Customer</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Barcode Barang</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Harga</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">QTY</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Total Harga Barang</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Total Belanja</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Total Keseluruhan</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {laporans.length > 0 ? (
                  laporans.map((laporan, index) => {
                    const barangLaporan = barang[index] || [];

                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">{laporan.tanggal}</td>
                        <td className="text-sm w-[15%] py-2 px-3">{laporan.noFaktur}</td>
                        <td className="text-sm py-2 px-3">{laporan.namaSalesman}</td>
                        <td className="text-sm py-2 px-3">{laporan.namaCustomer}</td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.barcodeBarang}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.hargaBrng}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.qty}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.totalHargaBarang}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">{laporan.totalBelanja}</td>
                        <td className="text-sm py-2 px-3">{laporan.totalBelanja}</td>
                        <td className="text-sm py-2 px-2.5">
                          <a
                            href={
                              "/print_histori_laporan_salesman_excelcom/" +
                              laporan.idTransaksi
                            }
                            target="_blank"
                          >
                            <IconButton size="md" color="green">
                              <PrinterIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center capitalize py-3 bg-gray-100">
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

export default LaporanMarketting;
