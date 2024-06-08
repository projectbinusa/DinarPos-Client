import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import { API_POIN_SALESMAN_TANGGAL_EXCELCOM } from "../../../utils/BaseUrl";

function DataPoin() {
  const tableRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get(API_POIN_SALESMAN_TANGGAL_EXCELCOM, {
        params: {
          tanggal_awal: tanggalAwal,
          tanggal_akhir: tanggalAkhir,
        },
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      setPoints(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (points && points.length > 0) {
      initializeDataTable();
    }
  }, [points]);

  const handleSearch = () => {
    getAll();
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Poin Teknisi
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
            <a href="/take_over">
              <span>Poin</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="bg-white shadow-lg p-5 my-5 rounded">
            <div className="flex justify-between items-center">
              <Typography
                variant="paragraph"
                className="capitalize font-semibold"
              >
                Poin{" "}
              </Typography>
              <a href="/add_point">
                <Button variant="gradient" color="blue">
                  Input{" "}
                </Button>
              </a>
            </div>
            <br /> <hr /> <br />
            <br />
            <div className="flex gap-2 items-center">
              <Input
                label="Tanda Terima"
                variant="static"
                color="blue"
                size="md"
                placeholder="Cari Tanda Terima"
                required
              />
              <Button variant="gradient" color="blue" size="sm">
                GO!
              </Button>
            </div>
            <br />
            <div className="overflow-x-auto" id="tables_poin">
              <table className="border border-collapse w-full" id="table_poin">
                <thead>
                  <tr>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      No
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      Teknisi
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      Total Poin
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      Nominal (Rp)
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {points.length > 0 ? (
                    points.map((point, index) => (
                      <tr key={index}>
                        <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                          {index + 1}
                        </td>
                        <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                          {point.teknisi}
                        </td>
                        <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                          {point.total_poin}
                        </td>
                        <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                          {point.nominal}
                        </td>
                        <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                          {point.persentase}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white shadow-lg p-5 my-5 rounded lg:col-span-2">
            <Typography
              variant="paragraph"
              className="capitalize font-semibold"
            >
              History Poin{" "}
            </Typography>
            <br />
            <hr /> <br /> <br />
            <div className="flex gap-2 items-center">
              <Input
                label="Tanggal Awal"
                variant="static"
                color="blue"
                size="md"
                value={tanggalAwal}
                onChange={(e) => setTanggalAwal(e.target.value)}
                placeholder="Masukkan Tanggal Awal"
                required
              />
              <Input
                label="Tanggal Akhir"
                variant="static"
                color="blue"
                size="md"
                value={tanggalAkhir}
                onChange={(e) => setTanggalAkhir(e.target.value)}
                placeholder="Masukkan Tanggal Akhir"
                required
              />
              <div>
                <IconButton size="md" color="light-blue" onClick={handleSearch}>
                  <MagnifyingGlassIcon className="w-6 h-6 white" />
                </IconButton>
              </div>
            </div>
            <br />
            <div className="rounded p-1 w-full overflow-x-auto">
              <table
                id="example_data"
                ref={tableRef}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Teknisi</th>
                    <th className="text-sm py-2 px-3 font-semibold">Tgl</th>
                    <th className="text-sm py-2 px-3 font-semibold">Poin</th>
                    <th className="text-sm py-2 px-3 font-semibold">Nominal</th>
                    <th className="text-sm py-2 px-3 font-semibold">Ket</th>
                  </tr>
                </thead>
                <tbody>
                  {points.length > 0 ? (
                    points.map((point, index) => (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3 text-center">
                          {point.teknisi}
                        </td>
                        <td className="text-sm py-2 px-3 text-center">
                          {point.tgl}
                        </td>
                        <td className="text-sm py-2 px-3 text-center">
                          {point.poin}
                        </td>
                        <td className="text-sm py-2 px-3 text-center">
                          {point.nominal}
                        </td>
                        <td className="text-sm py-2 px-3 text-center">
                          {point.keterangan}
                        </td>
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
          </div>
        </main>
      </div>
    </section>
  );
}

export default DataPoin;
