import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  API_SUPLIER,
  LAPORAN_SUPLIER,
} from "../../../../utils/BaseUrl";

function LaporanSuplierDinar() {
  const tableRef = useRef(null);
  const [laporans, setLaporan] = useState([]);
  const [suplierId, setsuplierId] = useState(0);
  const [tglAwal, settglAwal] = useState(0);
  const [tglAkhir, settglAkhir] = useState(0);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${LAPORAN_SUPLIER}/dinarpos`, {
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

  // const [barang, setBarang] = useState([]);

  // const barangTransaksi = async (transactionId) => {
  //   try {
  //     const response = await axios.get(
  //       `${API_BARANG}/barcode?barcode=${transactionId}`,
  //       {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     console.log(response.data.data);
  //     return response.data.data;
  //   } catch (error) {
  //     console.log("get all", error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   const fetchBarangTransaksi = async () => {
  //     const barangList = await Promise.all(
  //       laporans.map(async (laporan) => {
  //         const barangData = await barangTransaksi(laporan.barcodeBarang);
  //         return barangData;
  //       })
  //     );
  //     setBarang(barangList);
  //   };

  //   fetchBarangTransaksi();
  // }, [laporans]);

  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // SELECT
  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_SUPLIER}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions(data.data);
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

  const tglFilter = (e) => {
    e.preventDefault();
    sessionStorage.setItem("suplierId", suplierId);
    sessionStorage.setItem("tglAwal", tglAwal);
    sessionStorage.setItem("tglAkhir", tglAkhir);

    window.open("/tanggalfilter_suplier_dinarpos", "_blank");
  };
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen ">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            LAPORAN Suplier DINARPOS
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
            <a href="/laporan_suplier_dinarpos">
              <span>Laporan Suplier Dinarpos</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <br />
          <form onSubmit={tglFilter}>
            <div className="w-full lg:w-[50%]">
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
                    setsuplierId(event.target.value);
                  }}
                  placeholder="Pilih Suplier"
                  required
                />
                <datalist id="suplier-list">
                  {options.length > 0 && (
                    <>
                      {options.map((option) => (
                        <option value={option.idSuplier} key={option.idSuplier}>
                          {option.namaSuplier}
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
            <div className="mt-8 w-full lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
                onChange={(e) => settglAwal(e.target.value)}
              />
            </div>
            <div className="mt-8 w-full lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                required
                onChange={(e) => settglAkhir(e.target.value)}
              />
            </div>
            <Button className="mt-5 font-poppins font-medium" color="blue" type="submit">
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
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Suplier
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Jumlah Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Unit</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Harga Satuan
                  </th>
                </tr>
              </thead>
              <tbody>
                {laporans.length > 0 ? (
                  laporans.map((laporan, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-3 px-3">
                          {laporan.created_date}
                        </td>
                        <td className="text-sm w-[15%] py-3 px-3">
                          {laporan.transaksiBeli.suplier.namaSuplier}
                        </td>
                        <td className="text-sm py-3 px-3">
                          {laporan.namaBarang}
                        </td>
                        <td className="text-sm py-3 px-3">{laporan.qty}</td>
                        <td className="text-sm py-2 px-3">{laporan.unit}</td>
                        <td className="text-sm py-3 px-3">
                          {laporan.hargaBrng}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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

export default LaporanSuplierDinar;
