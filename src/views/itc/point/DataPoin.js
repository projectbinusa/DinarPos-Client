import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import { ChartBarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import $, { error } from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import { API_POIN } from "../../../utils/BaseUrl";

function DataPoin() {
  const tableRef = useRef(null);
  const tableRef2 = useRef(null);
  const [points, setPoints] = useState([]);
  const [pointsDate, setPointsDate] = useState([]);
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [validasi, setValidasi] = useState(false);

  // TOTAL POIN PER BULAN
  const [poins, setpoins] = useState([]);
  const [month, setmonth] = useState("");
  const [validasi2, setvalidasi2] = useState(false);

  const searchPoinByMonth = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const months = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${months}-${day}`;

    const bulan = validasi2 ? `${month}-01` : formattedDate;

    try {
      const response = await axios.get(`${API_POIN}/month?month=${bulan}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      setpoins(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (validasi2) {
      searchPoinByMonth();
      setvalidasi2(false);
    }
  }, [validasi2, month]);

  useEffect(() => {
    searchPoinByMonth();
  }, []);

  const handleSearchPoinByMonth = () => {
    setvalidasi2(true);
  };

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

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_POIN}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      setPoints(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // GET ALL HISTORY POINT BY DATE
  const getAllByDate = async () => {
    try {
      const response = await axios.get(
        `${API_POIN}/tanggal/?tanggal_akhir=${tanggalAkhir}&tanggal_awal=${tanggalAwal}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        }
      );
      setPointsDate(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (points && points.length > 0) {
      initializeDataTable();
    }
  }, [points]);

  useEffect(() => {
    if (poins && poins.length > 0) {
      initializeDataTable2();
    }
  }, [poins]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (validasi) {
      getAllByDate();
    }
  }, [validasi]);

  const searchHistoryPoin = () => {
    setValidasi((prevValidasi) => !prevValidasi);
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
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          <div className="bg-white shadow-lg p-5 my-5 rounded overflow-auto">
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
            <br /> <hr />
            <br />
            <div className="flex gap-2 items-center">
              <Input
                label="Bulan"
                variant="outlined"
                color="blue"
                size="md"
                type="month"
                onChange={(e) => setmonth(e.target.value)}
                required
              />
              <Button
                variant="gradient"
                color="blue"
                size="md"
                onClick={handleSearchPoinByMonth}
              >
                GO!
              </Button>
            </div>
            <br />
            <div className="overflow-x-auto">
              <table
                className="rounded-sm table-auto w-full"
                id="example_data1"
                ref={tableRef2}
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Teknisi</th>
                    <th className="text-sm py-2 px-3 font-semibold">
                      Total Poin
                    </th>
                    <th className="text-sm py-2 px-3 font-semibold">
                      Nominal (Rp)
                    </th>
                    <th className="text-sm py-2 px-3 font-semibold">%</th>
                    <th className="text-sm py-2 px-3 font-semibold">
                      <ChartBarIcon className="w-5 h-6 white" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {poins.length > 0 ? (
                    poins.map((poin, index) => {
                      const percent = Number(
                        (poin.totalPoin / 250) * 100
                      ).toFixed(2);
                      return (
                        <tr key={index}>
                          <td className="text-sm py-2 px-3 text-center">
                            {index + 1}
                          </td>
                          <td className="text-sm py-2 px-3 text-center">
                            {poin.teknisiNama}
                          </td>
                          <td className="text-sm py-2 px-3 text-center">
                            {poin.totalPoin}
                          </td>
                          <td className="text-sm py-2 px-3 text-center">
                            {poin.totalNominal}
                          </td>
                          <td className="text-sm py-2 px-3 text-center">
                            {percent}%
                          </td>
                          <td className="text-sm py-2 px-3 text-center">
                            <a href={`/grafik_poin/${poin.teknisiId}`}>
                              <IconButton color="blue" size="md">
                                <ChartBarIcon className="w-5 h-6 white" />
                              </IconButton>
                            </a>
                          </td>
                        </tr>
                      );
                    })
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
          <div className="bg-white shadow-lg p-5 my-5 rounded overflow-auto">
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
                onChange={(e) => setTanggalAwal(e.target.value)}
                placeholder="Tanggal Awal"
                type="date"
                required
              />
              <Input
                label="Tanggal Akhir"
                variant="static"
                color="blue"
                size="md"
                onChange={(e) => setTanggalAkhir(e.target.value)}
                placeholder="Tanggal Akhir"
                type="date"
                required
              />
              <div>
                <IconButton
                  size="md"
                  color="light-blue"
                  onClick={searchHistoryPoin}
                >
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
                  {validasi === true ? (
                    <>
                      {pointsDate.length > 0 ? (
                        pointsDate.map((poin, index) => (
                          <tr key={index}>
                            <td className="text-sm w-[4%]">{index + 1}</td>
                            <td className="text-sm py-2 px-3 text-center">
                              {poin.teknisi.nama}
                            </td>
                            <td className="text-sm py-2 px-3 text-center">
                              {formatDate(poin.tanggal)}
                            </td>
                            <td className="text-sm py-2 px-3 text-center">
                              {poin.poin}
                            </td>
                            <td className="text-sm py-2 px-3 text-center">
                              {poin.nominal}
                            </td>
                            <td className="text-sm py-2 px-3 text-center">
                              {poin.keterangan}
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
                    </>
                  ) : (
                    <>
                      {points.length > 0 ? (
                        points.map((point, index) => (
                          <tr key={index}>
                            <td className="text-sm w-[4%]">{index + 1}</td>
                            <td className="text-sm py-2 px-3 text-center">
                              {point.teknisi.nama}
                            </td>
                            <td className="text-sm py-2 px-3 text-center">
                              {formatDate(point.tanggal)}
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
                    </>
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
