import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import ReactSelect from "react-select";
import {
  API_SUPLIER,
  GET_BARANG_TRANSAKSI_BELI_EXCELCOM,
  LAPORAN_TRANSAKSI_BELI,
} from "../../../../utils/BaseUrl";
import {
  ArrowPathIcon,
  EyeIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

function LaporanTransaksiBeliExcelcom() {
  const tableRef = useRef(null);
  const [laporans, setLaporan] = useState([]);
  const [suplier, setsuplier] = useState([]);
  const [suplierId, setsuplierId] = useState(0);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${LAPORAN_TRANSAKSI_BELI}/excelcom`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setLaporan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getAllSuplier = async () => {
    try {
      const response = await axios.get(`${API_SUPLIER}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setsuplier(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
    getAllSuplier();
  }, []);

  useEffect(() => {
    if (laporans && laporans.length > 0) {
      initializeDataTable();
    }
  }, [laporans]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderBottom: "1px solid #ccc",
      border: "none",
      outline: "none",
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
  };

  const [barang, setBarang] = useState([]);

  const barangTransaksi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${GET_BARANG_TRANSAKSI_BELI_EXCELCOM}?id_transaksi=${transactionId}`,
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
          const barangData = await barangTransaksi(laporan.idTransaksiBeli);
          return barangData;
        })
      );
      setBarang(barangList);
    };

    fetchBarangTransaksi();
  }, [laporans]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            LAPORAN Transaksi Beli Excelcom
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
            <a href="/laporan_transaksi_beli_excelcom">
              <span>Laporan Transaksi Beli Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <form action="">
            <div className="w-72 lg:w-[50%]">
              <label
                htmlFor="suplier"
                className="text-[14px] text-blue-gray-400"
              >
                Data Suplier
              </label>
              <ReactSelect
                id="suplier"
                options={suplier.map((down) => {
                  return {
                    value: down.idSuplier,
                    label: down.namaSuplier,
                  };
                })}
                placeholder="Pilih Suplier"
                styles={customStyles}
                onChange={(selectedOption) =>
                  setsuplierId(selectedOption.value)
                }
              />
              <hr className="mt-1 bg-gray-400 h-[0.1em]" />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
              />
            </div>
            <Button className="mt-5" color="blue">
              Print
            </Button>
          </form>
          <div className="rounded mb-5 p-2 mt-12 overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto overflow-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-3 font-semibold">No Faktur</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Suplier
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Harga Beli (Rp)
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">QTY</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Total Harga Barang (Rp)
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Total Belanja (Rp)
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Total Keseluruhan (Rp)
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {laporans.length > 0 ? (
                  laporans.map((laporan, index) => {
                    const barangLaporan = barang[index] || [];

                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {laporan.created_date}
                        </td>
                        <td className="text-sm w-[15%] py-2 px-3">
                          {laporan.noFaktur}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.suplier.namaSuplier}
                        </td>
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
                          ))}{" "}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.qty}</li>
                            </ul>
                          ))}{" "}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.totalHargaBarang}</li>
                            </ul>
                          ))}{" "}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.totalBelanja}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.totalBelanja}
                        </td>
                        <td className="text-sm py-2 px-3 flex flex-col gap-2 items-center">
                          <a
                            href={
                              "/detail_histori_transaksi_beli_excelcom/" +
                              laporan.idTransaksiBeli
                            }
                          >
                            <IconButton size="md" color="light-blue">
                              <EyeIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <a
                            href={
                              "/print_histori_laporan_transaksi_beli_excelcom/" +
                              laporan.idTransaksiBeli
                            }
                            target="_blank"
                          >
                            <IconButton size="md" color="green">
                              <PrinterIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <IconButton size="md" color="red">
                            <ArrowPathIcon className="w-6 h-6 white" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="11"
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

export default LaporanTransaksiBeliExcelcom;
