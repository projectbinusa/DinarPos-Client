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
  GET_BARANG_TRANSAKSI_BELI_EXCELCOM,
  LAPORAN_SALESMAN,
} from "../../../../utils/BaseUrl";
import {
  ArrowPathIcon,
  EyeIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

function LaporanSalesmanExcelcom() {
  const tableRef = useRef(null);
  const [laporans, setLaporan] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${LAPORAN_SALESMAN}/excelcom`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setLaporan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
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

  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // SELECT
  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_SALESMAN}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions(data.data);
      console.log(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handle();
  }, [currentPage, values]);

  const handleChange = (event) => {
    setvalues(event.target.value);
    setCurrentPage(1);
  };

  const [barang, setbarang] = useState([]);
  const [id, setid] = useState(0);

  // GET BARANG TRANSAKSI
  const barangTransaksi = async () => {
    try {
      const response = await axios.get(
        `${GET_BARANG_TRANSAKSI_BELI_EXCELCOM}?id_transaksi=${id}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setbarang(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    barangTransaksi();
  }, [id]);

  const [salesmanId, setsalesmanId] = useState(0);
  const [tglAwal, settglAwal] = useState(null);
  const [tglAkhir, settglAkhir] = useState(null);

  const tanggalFilterSalesman = async () => {
    try {
      const response = await axios.get(
        `${LAPORAN_SALESMAN}/tanggal/excelcom?id_salesman=${salesmanId}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      console.log("get all", error);
    }
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            LAPORAN SALESMAN Excelcom
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
            <a href="/laporan_salesman_excelcom">
              <span>Laporan Salesman Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <form>
            <div className="w-72 lg:w-[50%]">
              <div className="flex gap-2 items-end">
                <Input
                  label="Suplier"
                  variant="static"
                  color="blue"
                  list="suplier-list"
                  id="suplier"
                  name="suplier"
                  onChange={(event) => {
                    handleChange(event);
                    setsalesmanId(event.target.value);
                  }}
                  placeholder="Pilih Suplier"
                  required
                />
                <datalist id="suplier-list">
                  {options.length > 0 && (
                    <>
                      {options.map((option) => (
                        <option value={option.idSalesman}>
                          {option.namaSalesman}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>

                <div className="flex gap-2">
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!options.length}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
                onChange={(e) => settglAwal(e.target.value)}
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                required
                onChange={(e) => settglAkhir(e.target.value)}
              />
            </div>
            <Button className="mt-5" color="blue" type="submit">
              Print
            </Button>
          </form>
          <div className="rounded mb-5 mt-12 overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto overflow-auto"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="py-2 px-3 font-semibold">Tanggal</th>
                  <th className="py-2 px-3 font-semibold">No Faktur</th>
                  <th className="py-2 px-3 font-semibold">Nama Salesman</th>
                  <th className="py-2 px-3 font-semibold">Nama Customer</th>
                  <th className="py-2 px-3 font-semibold">Nama Barang</th>
                  <th className="py-2 px-3 font-semibold">Harga</th>
                  <th className="py-2 px-3 font-semibold">QTY</th>
                  <th className="py-2 px-3 font-semibold">
                    Total Harga Barang
                  </th>
                  <th className="py-2 px-3 font-semibold">Total Belanja</th>
                  <th className="py-2 px-3 font-semibold">Total Keseluruhan</th>
                  <th className="py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {laporans.length > 0 ? (
                  laporans.map((laporan, index) => (
                    <tr key={index}>
                      {setid(laporan.idTransaksi)}
                      <td className="w-[4%]">{index + 1}</td>
                      <td className="py-2 px-3">{laporan.created_date}</td>
                      <td className="w-[15%] py-2 px-3">{laporan.noFaktur}</td>
                      <td className="py-2 px-3">
                        {laporan.salesman.namaSalesman}
                      </td>
                      <td className="py-2 px-3">
                        {laporan.customer.nama_customer}
                      </td>
                      <td className="py-2 px-3">{laporan.namaSalesman}</td>
                      <td className="py-2 px-3">
                        {barang.length > 0
                          ? barang.map((brg, index) => (
                              <ul key={index}>
                                <li>{brg.hargaBrng}</li>
                              </ul>
                            ))
                          : ""}
                      </td>
                      <td className="py-2 px-3">
                        {barang.length > 0
                          ? barang.map((brg, index) => (
                              <ul key={index}>
                                <li>{brg.qty}</li>
                              </ul>
                            ))
                          : ""}
                      </td>
                      <td className="py-2 px-3">
                        {barang.length > 0
                          ? barang.map((brg, index) => (
                              <ul key={index}>
                                <li>{brg.totalHargaBarang}</li>
                              </ul>
                            ))
                          : ""}
                      </td>{" "}
                      <td className="py-2 px-3">{laporan.totalBelanja}</td>
                      <td className="py-2 px-3">{laporan.totalBelanja}</td>
                      <td className="py-2 px-3 flex flex-col gap-2">
                        <a
                          href={
                            "/detail_histori_laporan_salesman/" +
                            laporan.idTransaksi
                          }
                        >
                          <IconButton size="md" color="light-blue">
                            <EyeIcon className="w-6 h-6 white" />
                          </IconButton>
                        </a>
                        <a
                          href={
                            "/print_histori_laporan_salesman_excelcom/" +
                            laporan.idTransaksi
                          }
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
                  ))
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

export default LaporanSalesmanExcelcom;
