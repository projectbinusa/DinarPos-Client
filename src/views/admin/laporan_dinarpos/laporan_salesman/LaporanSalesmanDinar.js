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
  API_SALESMAN,
  GET_BARANG_TRANSAKSI_JUAL_DINARPOS,
  LAPORAN_SALESMAN,
} from "../../../../utils/BaseUrl";
import {
  ArrowPathIcon,
  EyeIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

function LaporanSalesmanDinar() {
  const tableRef = useRef(null);
  const [laporans, setLaporan] = useState([]);
  const [salesman, setsalesman] = useState([]);
  const [salesmanId, setsalesmanId] = useState(0);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${LAPORAN_SALESMAN}/dinarpos`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setLaporan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getAllSalesman = async () => {
    try {
      const response = await axios.get(`${API_SALESMAN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setsalesman(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
    getAllSalesman();
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
        `${GET_BARANG_TRANSAKSI_JUAL_DINARPOS}?id_transaksi=${transactionId}`,
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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen overflow-x-auto">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            LAPORAN SALESMAN DINARPOS
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
            <a href="/laporan_salesman_dinarpos">
              <span>Laporan Salesman Dinarpos</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <form action="">
            <div className="w-72 lg:w-[50%]">
              <label
                htmlFor="salesman"
                className="text-[14px] text-blue-gray-400"
              >
                Data Salesman
              </label>
              <ReactSelect
                id="salesmas"
                options={salesman.map((down) => {
                  return {
                    value: down.idSalesman,
                    label: down.namaSalesman,
                  };
                })}
                placeholder="Pilih Salesman"
                styles={customStyles}
                onChange={(selectedOption) =>
                  setsalesmanId(selectedOption.value)
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
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-500 text-white w-full">
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
                          {laporan.salesman.namaSalesman}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.customer.nama_customer}
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
                        <td className="text-sm py-2 px-3">
                          {laporan.totalBelanja}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.totalBelanja}
                        </td>
                        <td className="text-sm py-2 px-3 flex flex-col gap-2 justify-center items-center">
                          <a
                            href={
                              "/detail_histori_salesman_dinarpos/" +
                              laporan.idTransaksi
                            }
                          >
                            <IconButton size="md" color="light-blue">
                              <EyeIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <a
                            href={
                              "/print_histori_laporan_salesman_dinarpos/" +
                              laporan.idTransaksi
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
                      colSpan="12"
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

export default LaporanSalesmanDinar;
